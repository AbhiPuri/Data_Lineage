import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { FilterApiService } from '../../Services/filterapi.services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //animations: [
  //  trigger('slideInOut', [
  //    state(
  //      'open',
  //      style({
  //        transform: 'translateX(0)',
  //      })
  //    ),
  //    state(
  //      'closed',
  //      style({
  //        transform: 'translateX(-300px)',
  //      })
  //    ),
  //    transition('open => closed', animate('300ms ease-in')),
  //    transition('closed => open', animate('300ms ease-out')),
  //  ]),
  //],

  animations: [
    trigger('offcanvasAnimation', [
      state(
        'open',
        style({
          transform: 'translateX(0%)',
          marginLeft: '400px',
          width: 'calc(100% - 400px)'
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(0%)',
          marginLeft: '0px',
          width: '100%'
        })
      ),
      //transition('closed => open', [animate('0.3s 300ms')]),
      //transition('open => closed', [animate('0.3s 300ms')])
      transition('open => closed', animate('150ms ease-out')),
      transition('closed => open', animate('0.3s 300ms ease-in')),
    ])
  ],
})
export class HomeComponent {

  //private paramFilter: string;
  private apiUrl = 'http://localhost:3000/api/query';
  apiData: any;
  public selectedClient: string;

  constructor(private filterapiService: FilterApiService) {
    this.selectedClient = "None";
  }

  IsDataVisible: boolean = false;

  //clients: string[] = [
  //  'Standard',
  //  'GAM',
  //  'ZIC',
  //  'ADIA',
  //];
  //clusters = [
  //  { label: 'Instrument', checked: false },
  //  { label: 'Services', checked: false },
  //  { label: 'Regulations', checked: false },
  //  { label: 'Party', checked: false },
  //];
  clients = [];
  clusters = [
    { label: 'None', checked: false }
  ];
  subClusters = [
    { label: 'None', checked: false }
  ];
  categories = [
    { label: 'None', checked: false }
  ];
  subCategories = [
    { label: 'None', checked: false }
  ];
  //subClusters = [
  //  { label: 'Equity', checked: false },
  //  { label: 'Bond', checked: false },
  //  { label: 'IOS Service', checked: false },
  //  { label: 'IAS Service', checked: false },
  //];
  //subcluster: string[] = [
  //  'Equity',
  //  'Fixed-Income',
  //  'IOS Service',
  //  'IAS Service',
  //  'CSDR',
  //  'FUTURES',
  //  'OPTIONS',
  //  'BOND',
  //  'ADRGDR',
  //  'COMMODITIES',
  //  'US MBS POOLS',
  //  'WARRANT',
  //  'TBA',
  //  'INDEX SECURITIES',
  //  'SFDR',
  //  'SFTR',
  //  'SOLVENCY',
  //  'COMPLIANCE',
  //  'LRS Service',
  //];
  //category1: string[] = [
  //  'Compliance',
  //  'Identifiers',
  //  'Regulation',
  //  'Static',
  //];
  //category2: string[] = [
  //  'Characteristics',
  //  'Classifications',
  //  'CSDR',
  //  'Fund',
  //  'Instr Identifiers',
  //  'Issuer Identifiers',
  //  'MFID/CSDR',
  //  'Post-Trade Checks',
  //];

  //isPaneOpen = false;

  //togglePane() {
  //  this.isPaneOpen = !this.isPaneOpen;
  //}
  isOffcanvasOpen: boolean = false;

  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;

    if (this.isOffcanvasOpen) {
      var sqlQueryGetClientData = `SELECT clientname FROM dms_client`;
      this.GetFilterData(sqlQueryGetClientData).then((clientData) => {
        this.clients = clientData;
      });
    }
  }

  OnExportClick() {
    let abc = "test";
  }

  OnLogoutClick() {
    let abc = "test";
  }

  //options = [
  //  { label: 'Option 1', checked: false },
  //  { label: 'Option 2', checked: false },
  //  { label: 'Option 3', checked: false },
  //];

  clientSelectionChanged() {
    if (this.selectedClient != 'None') {
      var sqlQueryGetClusterData = `SELECT dclus.clustername FROM dms_cluster dclus INNER JOIN  dms_client dclnt ON dclus.clientid = dclnt.clientid WHERE dclnt.clientname = '${this.selectedClient}'`;
      var sqlQueryGetCategoryData = `SELECT dcat.categoryname FROM dms_category dcat INNER JOIN  dms_client dclnt ON dcat.clientid = dclnt.clientid WHERE dclnt.clientname = '${this.selectedClient}'`;
      this.GetFilterData(sqlQueryGetClusterData).then((clusterData) => {
        this.clusters = clusterData.map(([label]: string) => ({ label, checked: false }))
      });
      this.GetFilterData(sqlQueryGetCategoryData).then((categoryData) => {
        this.categories = categoryData.map(([label]: string) => ({ label, checked: false }))
      });
    }
  }

  ClusterCheckboxChanged(item: any) {
    //this.GetFilterData(this.selectedCluster.join(', '));
    this.selectedCluster = this.clusters.filter((cluster) => cluster.checked).map((cluster) => cluster.label);
    if (this.selectedCluster.length > 0) {
      //this.GetFilterData(this.selectedCluster.join(', '));

      var sqlQueryGetSubClusterData = `Select sub_clustername From dms_sub_cluster dsc join dms_cluster dc on dsc.clusterid = dc.clusterid Where dc.clustername IN (${this.selectedCluster.join(', ').split(',').map(value => `'${value.trim()}'`)})`;
      this.GetFilterData(sqlQueryGetSubClusterData).then((data) => {
        this.subClusters = data.map(([label]: string) => ({ label, checked: false }));
      });

      return this.selectedCluster.join(', ');
    }
    else {
      return 'None';
    }
  }

  CategoryCheckboxChanged(item: any) {
    this.selectedCategory = this.categories.filter((category) => category.checked).map((category) => category.label);
    if (this.selectedCategory.length > 0) {
      var sqlQueryGetSubCategoryData = `Select dscat.sub_categoryname From dms_sub_category dscat join dms_category dcat on dscat.categoryid = dcat.categoryid Where dcat.categoryname IN (${this.selectedCategory.join(', ').split(',').map(value => `'${value.trim()}'`)})`;
      this.GetFilterData(sqlQueryGetSubCategoryData).then((data) => {
        this.subCategories = data.map(([label]: string) => ({ label, checked: false }));
      });

      return this.selectedCategory.join(', ');
    }
    else {
      return 'None';
    }
  }

  //ClusterClicked() {
  //  this.GetFilterData(this.selectedCluster.join(', '));
  //}

  getSelectedClustersLabel() {
    //const selectedClusters = this.clusters.filter((cluster) => cluster.checked).map((cluster) => cluster.label);
    //this.selectedCluster = this.clusters.filter((cluster) => cluster.checked).map((cluster) => cluster.label);
    //if (this.selectedCluster.length > 0) {
    //  //this.GetFilterData(this.selectedCluster.join(', '));
    //  return this.selectedCluster.join(', ');
    //}
    //else {
    //  return 'None';
    //}

    //this.GetFilterData(this.selectedCluster.join(', '));

    this.selectedCluster = this.clusters.filter((cluster) => cluster.checked).map((cluster) => cluster.label);
    if (this.selectedCluster.length > 0) {
      return this.selectedCluster.join(', ');
    }
    else {
      return 'None';
    }
  }

  getSelectedSubClustersLabel() {
    this.selectedSubCluster = this.subClusters.filter((subCluster) => subCluster.checked).map((subCluster) => subCluster.label);
    if (this.selectedSubCluster.length > 0) {
      return this.selectedSubCluster.join(', ');
    }
    else {
      return 'None';
    }
  }

  getSelectedCategoriesLabel() {
    this.selectedCategory = this.categories.filter((category) => category.checked).map((category) => category.label);
    if (this.selectedCategory.length > 0) {
      return this.selectedCategory.join(', ');
    }
    else {
      return 'None';
    }
  }

  getSelectedSubCategoriesLabel() {
    this.selectedSubCategory = this.subCategories.filter((subCategory) => subCategory.checked).map((subCategory) => subCategory.label);
    if (this.selectedSubCategory.length > 0) {
      return this.selectedSubCategory.join(', ');
    }
    else {
      return 'None';
    }
  }

  //getSelectedOptionsLabel() {
  //  const selectedOptions = this.options
  //    .filter((option) => option.checked)
  //    .map((option) => option.label);
  //  if (selectedOptions.length > 0) {
  //    return selectedOptions.join(', ');
  //  } else {
  //    return 'Select Options';
  //  }
  //}

  selectedCluster: string[] = [];
  selectedSubCluster: string[] = [];
  selectedSubCategory: string[] = [];
  //selectedCluster[0] = 'None';

  clusterSelectionChanged() {
    this.selectedCluster;
    //if (this.selectedCluster === 'None') {
    //  this.selectedSubCluster = 'None';
    //  this.selectedCategory = 'None';
    //}
  }

  //selectedSubCluster: string = 'None';

  subclusterSelectionChanged() {
    //if (this.selectedSubCluster === 'None') {
    //  this.selectedCategory = 'None';
    //}
  }

  selectedCategory: string[] = [];

  categorySelectionChanged() {
    //if (this.selectedCategory === 'Instrument') {

    //}
  }

  //async GetClusterData() {
  //  try {
  //    if (this.identifiers.split(',').length > 1) {
  //      var sqlQuery = `Select ISIN, CUSIP, SEDOL from stdb_gc_instrument Where ${this.selectedIdentifier} IN (${this.identifiers.split(',').map(value => `'${value.trim()}'`)})`;
  //      //var sqlQuery = `Select ISIN, CUSIP, SEDOL from stdb_gc_instrument Where ${this.selectedIdentifier} IN ('${identifierValue}')`;
  //    }
  //    else {
  //      var sqlQuery = `Select ISIN, CUSIP, SEDOL from stdb_gc_instrument Where ${this.selectedIdentifier} = '${this.identifiers}'`;
  //    }

  //    this.apiData = [];
  //    this.apiService.getData(sqlQuery).subscribe((data) => {
  //      this.apiData = data;
  //      this.identifiers = "";
  //      this.openPopup();
  //    });
  //  }
  //  catch (err) {
  //    this.apiData = [];
  //    console.log(err);
  //  }
  //}
  data: string[] = [];
  //async GetFilterData1(sqlQuery: string): Promise<string[]> {
  //  try {

  //    //var sqlQuery = `Select sub_clustername From dms_sub_cluster dsc join dms_cluster dc on dsc.clusterid = dc.clusterid Where dc.clustername IN (${paramFilter.split(',').map(value => `'${value.trim()}'`)})`;
      
  //    //this.subClusters = [];
  //    //let abc = [];

  //    //this.filterapiService.getData(sqlQuery).subscribe((data) => {
  //    //    //abc = data;
  //    //    //this.subClusters = data.map(([label]: string) => ({ label, checked: false }));;
  //    //    data.map(([label]: string) => ({ label, checked: false }));;
  //    //    //this.apiData = data;
  //    //    //this.identifiers = "";
  //    //    //this.openPopup();
  //    //  });

  //    //return new Promise<string[]>((resolve, reject) => {
  //    //  this.filterapiService.getData(sqlQuery).subscribe(
  //    //    (response) => {
  //    //      this.data = response;
  //    //      resolve(this.data);
  //    //    },
  //    //    (error) => {
  //    //      console.error('Error:', error);
  //    //      reject(error);
  //    //    }
  //    //  );
  //    //});

  //    const response = await this.filterapiService.getData(sqlQuery).toPromise();
  //    this.data = response;
  //    return this.data;
  //  }
  //  catch (err) {
  //    this.apiData = [];
  //    console.log('Error: ', err);
  //  }
  //}

  async GetFilterData(sqlQuery: string): Promise<any> {
    try {
      const response = await this.filterapiService.getData(sqlQuery).toPromise();
      this.data = response;
      return this.data;
    }
    catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  OnSearchClicked() {
    this.isOffcanvasOpen = false;
    let client = this.selectedClient;
    let cluster = this.selectedCluster;
    let subcluster = this.selectedSubCluster;
    this.IsDataVisible = true;
  }
}
