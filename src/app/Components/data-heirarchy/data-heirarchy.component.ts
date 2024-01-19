import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faColumns, faMinus, faPlus, faSearch, faSort } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';
import { FilterApiService } from '../../Services/filterapi.services';
import { DataModel } from '../../Models/data.model';

@Component({
  selector: 'app-data-heirarchy',
  templateUrl: './data-heirarchy.component.html',
  styleUrls: ['./data-heirarchy.component.css'],
  template: `
    <div *ngIf="data">
      <h1>Data</h1>
      <pre>{{ data.nclobData }}</pre>
    </div>
  `,
})
export class DataHeirarchyComponent implements OnInit {

  sortIcon = faSort;
  searchIcon = faSearch;
  columnChooserIcon = faColumns;
  plusIcon = faPlus;
  minusIcon = faMinus;
  filterSearchText: any;
  categoryList: any[] = [];
  selectedCategoryItems: any[] = [];
  subCategoryList: any[] = [];
  selectedSubCategoryItems: any[] = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  mainAccordion: any[] = [];
  subAccordion: any[] = [];
  mainAccIndex: any = null;
  subAcc: any[][] = [[]];
  testList: any[] = [];
  testList1: string[] = [];
  testList2: DataModel[] = [];
  //dataModel: DataModel[] = [{
  //  assetClassName: "abc",
  //  edmFieldName: "abc",
  //  edmFieldExportName: "abc",
  //  edmFieldDefinition: "abc",
  //  edmFieldMandatory: "abc",
  //  edmFieldNormalization: "abc",
  //  edmFieldDerivation: "abc",
  //  chatGptOutput: "abc",
  //  isCustom: "abc",
  //  vendorName: "abc",
  //  vendorFieldName: "abc",
  //}];

  newDataList: any[] = [];
  previousCategoryList: any[] = [];
  previousSubCategoryList: any[] = [];
  sortProperty: string = 'id';
  sortOrder = 1;
  defaultViewColumns = [
    { columnName: "Id", isRequired: true, showColumn: true },
    { columnName: "Category", isRequired: true, showColumn: true },
    { columnName: "SubCategory", isRequired: true, showColumn: true },
    { columnName: "EdmFieldName", isRequired: true, showColumn: true },
    { columnName: "EdmFieldComponent", isRequired: true, showColumn: true },
    { columnName: "EdmFieldExportName", isRequired: false, showColumn: false },
    { columnName: "EdmFieldDefinition", isRequired: false, showColumn: false },
    { columnName: "EdmFieldMandatory", isRequired: true, showColumn: true },
    { columnName: "EdmFieldNormalization", isRequired: false, showColumn: false },
    { columnName: "EdmFieldDerivation", isRequired: false, showColumn: false },
    { columnName: "ChatGptOutput", isRequired: false, showColumn: false },
    { columnName: "IsCustom", isRequired: false, showColumn: false },
    { columnName: "VendorName", isRequired: true, showColumn: true },
    { columnName: "VendorFieldName", isRequired: true, showColumn: true },
    { columnName: "ScdFieldName", isRequired: true, showColumn: true },
    { columnName: "ScdModelName", isRequired: true, showColumn: true },
    { columnName: "ScdFieldDefinition", isRequired: false, showColumn: false },
    { columnName: "ScdFieldMandatory", isRequired: true, showColumn: true },
    { columnName: "ScdFieldTranslation", isRequired: false, showColumn: false },
    { columnName: "ScdFieldFormula", isRequired: false, showColumn: false },
    { columnName: "ScdChatGptOutput", isRequired: false, showColumn: false },
    { columnName: "Cost", isRequired: true, showColumn: true },

  ];
  modalRef: BsModalRef | any;
  selecttabbox: any = 1;



  constructor(private modalService: BsModalService, private filterapiService: FilterApiService) {

  }

  getData() {
    this.testList = [
      {
        id: 1,
        name: 'Instrument',
        subTestList: [
          {
            id: 1,
            name: 'Equity',
            subTestDataList: [
              {
                id: 1,
                category: ['Static'],
                subCategory: 'Characteristics',
                edmFieldName: 'Long Security Name 1',
                edmFieldComponent: 'Instrument',
                edmFieldExportName: 'Long Security Name 1',
                edmFieldDefinition: 'Long Security Name 1',
                edmFieldMandatory: 'Optional',
                edmFieldNormalization: ' ',
                edmFieldDerivation: ' ',
                chatGptOutput: ' ',
                isCustom: 'N',
                vendorName: 'Open Source',
                vendorFieldName: 'Long Security Name 1',
                scdFieldName: 'Long Security Name 1',
                scdModelName: 'Equity',
                scdFieldDefinition: 'The long name of the security.',
                scdFieldMandatory: 'Optional',
                scdFieldTranslation: 'N/A',
                scdFieldFormula: 'N/A',
                scdChatGptOutput: 'None',
                cost: '$1',
              },
              {
                id: 2,
                category: ['Static', 'Identifiers'],
                subCategory: 'Instrument Identifier',
                edmFieldName: 'ISIN',
                edmFieldComponent: 'Instrument',
                edmFieldExportName: 'ISIN',
                edmFieldDefinition: 'ISIN',
                edmFieldMandatory: 'Required',
                edmFieldNormalization: ' ',
                edmFieldDerivation: ' ',
                chatGptOutput: ' ',
                isCustom: 'N',
                vendorName: 'Open Source',
                vendorFieldName: 'ID_ISIN',
                scdFieldName: 'ISIN',
                scdModelName: 'Equity',
                scdFieldDefinition: 'The ISIN of the security.',
                scdFieldMandatory: 'Required',
                scdFieldTranslation: 'N/A',
                scdFieldFormula: 'N/A',
                scdChatGptOutput: 'None',
                cost: '$4',
              },
            ]

          },
          {
            id: 2,
            name: 'Bond',
            subTestDataList: [
              {
                id: 3,
                category: ['Static'],
                subCategory: 'Characteristics',
                edmFieldName: 'Long Security Name 1',
                edmFieldComponent: 'Instrument',
                edmFieldExportName: 'Long Security Name 1',
                edmFieldDefinition: 'Long Security Name 1',
                edmFieldMandatory: 'Optional',
                edmFieldNormalization: ' ',
                edmFieldDerivation: ' ',
                chatGptOutput: ' ',
                isCustom: 'N',
                vendorName: 'Open Source',
                vendorFieldName: 'Long Security Name 1',
                scdFieldName: 'Long Security Name 1',
                scdModelName: 'Bond',
                scdFieldDefinition: 'The long name of the security.',
                scdFieldMandatory: 'Optional',
                scdFieldTranslation: 'N/A',
                scdFieldFormula: 'N/A',
                scdChatGptOutput: 'None',
                cost: '$1',
              },
              {
                id: 4,
                category: ['Static', 'Identifiers'],
                subCategory: 'Instrument Identifier',
                edmFieldName: 'ISIN',
                edmFieldComponent: 'Instrument',
                edmFieldExportName: 'ISIN',
                edmFieldDefinition: 'ISIN',
                edmFieldMandatory: 'Required',
                edmFieldNormalization: ' ',
                edmFieldDerivation: ' ',
                chatGptOutput: ' ',
                isCustom: 'N',
                vendorName: 'Open Source',
                vendorFieldName: 'ID_ISIN',
                scdFieldName: 'ISIN',
                scdModelName: 'Equity',
                scdFieldDefinition: 'The ISIN of the security.',
                scdFieldMandatory: 'Required',
                scdFieldTranslation: 'N/A',
                scdFieldFormula: 'N/A',
                scdChatGptOutput: 'None',
                cost: '$4',
              },
            ]
          },
        ]
      },
      {
        id: 2,
        name: 'Services',
        subTestList: [
          {
            id: 1,
            name: 'IAS',
            subTestDataList: [
              {
                id: 5,
                category: ['Static'],
                subCategory: 'Characteristics',
                edmFieldName: 'SecurityName',
                edmFieldComponent: 'Instrument',
                edmFieldExportName: 'SecurityName',
                edmFieldDefinition: 'SecurityName',
                edmFieldMandatory: 'Mandatory',
                edmFieldNormalization: ' ',
                edmFieldDerivation: ' ',
                chatGptOutput: ' ',
                isCustom: 'N',
                vendorName: 'Open Source',
                vendorFieldName: 'SecurityName',
                scdFieldName: 'SecurityName',
                scdModelName: 'Equities',
                scdFieldDefinition: 'The long name of the security.',
                scdFieldMandatory: 'Optional',
                scdFieldTranslation: 'N/A',
                scdFieldFormula: 'N/A',
                scdChatGptOutput: 'None',
                cost: '$1',
              },
              {
                id: 6,
                category: ['Static'],
                subCategory: 'Characteristics',
                edmFieldName: 'SecurityName',
                edmFieldComponent: 'Instrument',
                edmFieldExportName: 'SecurityName',
                edmFieldDefinition: 'SecurityName',
                edmFieldMandatory: 'Mandatory',
                edmFieldNormalization: ' ',
                edmFieldDerivation: ' ',
                chatGptOutput: ' ',
                isCustom: 'N',
                vendorName: 'Open Source',
                vendorFieldName: 'SecurityName',
                scdFieldName: 'SecurityName',
                scdModelName: 'Equities',
                scdFieldDefinition: 'The long name of the security.',
                scdFieldMandatory: 'Optional',
                scdFieldTranslation: 'N/A',
                scdFieldFormula: 'N/A',
                scdChatGptOutput: 'None',
                cost: '$1',
              },
            ]
          },
          {
            id: 2,
            name: 'IOS',
            subTestDataList: [
              {
                id: 7,
                category: ['Static'],
                subCategory: 'Characteristics',
                edmFieldName: 'SecurityName',
                edmFieldComponent: 'Instrument',
                edmFieldExportName: 'SecurityName',
                edmFieldDefinition: 'SecurityName',
                edmFieldMandatory: 'Mandatory',
                edmFieldNormalization: ' ',
                edmFieldDerivation: ' ',
                chatGptOutput: ' ',
                isCustom: 'N',
                vendorName: 'Open Source',
                vendorFieldName: 'SecurityName',
                scdFieldName: 'SecurityName',
                scdModelName: 'Equities',
                scdFieldDefinition: 'The long name of the security.',
                scdFieldMandatory: 'Optional',
                scdFieldTranslation: 'N/A',
                scdFieldFormula: 'N/A',
                scdChatGptOutput: 'None',
                cost: '$1',
              },
              {
                id: 8,
                category: ['Static'],
                subCategory: 'Characteristics',
                edmFieldName: 'SecurityName',
                edmFieldComponent: 'Instrument',
                edmFieldExportName: 'SecurityName',
                edmFieldDefinition: 'SecurityName',
                edmFieldMandatory: 'Mandatory',
                edmFieldNormalization: ' ',
                edmFieldDerivation: ' ',
                chatGptOutput: ' ',
                isCustom: 'N',
                vendorName: 'Open Source',
                vendorFieldName: 'SecurityName',
                scdFieldName: 'SecurityName',
                scdModelName: 'Equities',
                scdFieldDefinition: 'The long name of the security.',
                scdFieldMandatory: 'Optional',
                scdFieldTranslation: 'N/A',
                scdFieldFormula: 'N/A',
                scdChatGptOutput: 'None',
                cost: '$1',
              },
              {
                id: 9,
                category: ['Static'],
                subCategory: 'Characteristics',
                edmFieldName: 'SecurityName',
                edmFieldComponent: 'Instrument',
                edmFieldExportName: 'SecurityName',
                edmFieldDefinition: 'SecurityName',
                edmFieldMandatory: 'Mandatory',
                edmFieldNormalization: ' ',
                edmFieldDerivation: ' ',
                chatGptOutput: ' ',
                isCustom: 'N',
                vendorName: 'Open Source',
                vendorFieldName: 'SecurityName',
                scdFieldName: 'SecurityName',
                scdModelName: 'Equities',
                scdFieldDefinition: 'The long name of the security.',
                scdFieldMandatory: 'Optional',
                scdFieldTranslation: 'N/A',
                scdFieldFormula: 'N/A',
                scdChatGptOutput: 'None',
                cost: '$1',
              },
              {
                id: 10,
                category: ['Static'],
                subCategory: 'Characteristics',
                edmFieldName: 'SecurityName',
                edmFieldComponent: 'Instrument',
                edmFieldExportName: 'SecurityName',
                edmFieldDefinition: 'SecurityName',
                edmFieldMandatory: 'Mandatory',
                edmFieldNormalization: ' ',
                edmFieldDerivation: ' ',
                chatGptOutput: ' ',
                isCustom: 'N',
                vendorName: 'Open Source',
                vendorFieldName: 'SecurityName',
                scdFieldName: 'SecurityName',
                scdModelName: 'Equities',
                scdFieldDefinition: 'The long name of the security.',
                scdFieldMandatory: 'Optional',
                scdFieldTranslation: 'N/A',
                scdFieldFormula: 'N/A',
                scdChatGptOutput: 'None',
                cost: '$1',
              },
            ]
          },
        ]
      },
    ];
  }

  getGridData() {
    
    const selClient = "Standard";

    //var sqlQueryGetGridData = `Select DSF.edm_field_normalization From DMS_Standard_Fields DSF`;
    var sqlQueryGetGridData = `Select DCNT.ClientName, DCL.ClusterName, DSCL.Sub_ClusterName, DSF.CategoryName, DSF.Sub_CategoryName, DSF.Edm_Field_Name, DSF.Edm_Field_Component, DSF.Edm_Field_Export_Name, DSF.edm_field_definition, DSF.edm_field_mandatory, DSF.iscustom, DSF.vendorname, DSF.vendor_field_name, DSF.scd_field_name, DSF.scd_model_name, DSF.scd_field_definition, DSF.scd_field_mandatory, DSF.scd_field_translation, DSF.scd_field_formula, DSF.SCD_FIELD_SPECIFICATION, DSF.cost From DMS_Standard_Fields DSF Join DMS_Client DCNT ON DCNT.ClientID = DSF.ClientID Join DMS_Cluster DCL ON DCL.ClusterID = DSF.ClusterID Join DMS_Sub_Cluster DSCL ON dscl.sub_clusterid = DSF.sub_clusterid Where DCNT.ClientName = '${selClient}'`;
    //var sqlQueryGetGridData = `Select DCNT.ClientName, DCL.ClusterName, DSCL.Sub_ClusterName, DSF.CategoryName, DSF.Sub_CategoryName, DSF.Edm_Field_Name, DSF.Edm_Field_Component, DSF.Edm_Field_Export_Name, DSF.edm_field_definition, DSF.edm_field_mandatory, DSF.edm_field_normalization, DSF.edm_field_derivation, DSF.EDM_FIELD_SPECIFICATION, DSF.iscustom, DSF.vendorname, DSF.vendor_field_name, DSF.scd_field_name, DSF.scd_model_name, DSF.scd_field_definition, DSF.scd_field_mandatory, DSF.scd_field_translation, DSF.scd_field_formula, DSF.SCD_FIELD_SPECIFICATION, DSF.cost From DMS_Standard_Fields DSF Join DMS_Client DCNT ON DCNT.ClientID = DSF.ClientID Join DMS_Cluster DCL ON DCL.ClusterID = DSF.ClusterID Join DMS_Sub_Cluster DSCL ON dscl.sub_clusterid = DSF.sub_clusterid Where DCNT.ClientName = '${selClient}'`;

    this.GetDBData(sqlQueryGetGridData);
    //this.GetDBData(sqlQueryGetGridData).then((categoryData) => {
    //  this.categories = categoryData.map(([label]: string) => ({ label, checked: false }))
    //});
  }
  data: any;
  parsedData: any;
  async GetDBData(sqlQuery: string): Promise<any> {
    try {
      const response = await this.filterapiService.getData(sqlQuery).toPromise();
      this.testList2 = response;
      return this.testList2;
    }
    catch (error) {
      console.error('Error:', error);
      throw error;
    }

    //this.filterapiService.getData(sqlQuery).subscribe(
    //  (response) => {
    //    this.data = response;
    //    //this.parseData();
    //  },
    //  (error) => {
    //    console.error('Error fetching data:', error);
    //  }
    //);
  }

  parseData() {
    // Assuming your NCLOB data is stored in a field named 'nclobField'
    if (this.data && this.data.nclobField) {
      // Example: Parsing NCLOB data to extract necessary information
      try {
        this.parsedData = JSON.parse(this.data.nclobField);
      } catch (error) {
        console.error('Error parsing NCLOB data:', error);
      }
    }
  }

  ngOnInit() {
    this.getData();
    this.getGridData();
    this.getCategoryList();
    this.getSubCategoryList();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  getCategoryList() {
    this.testList.forEach((e: any) => {
      e.subTestList.forEach((x: any) => {
        if (x.subTestDataList != undefined) {
          x.subTestDataList.forEach((y: any) => {
            y.category.forEach((c: any) => {
              if (!this.categoryList.includes(c))
                this.categoryList.push(c);
            });
          });
        }
      });
    });
  }

  getSubCategoryList() {
    this.testList.forEach((e: any) => {
      e.subTestList.forEach((x: any) => {
        if (x.subTestDataList != undefined) {
          x.subTestDataList.forEach((y: any) => {
            if (!this.subCategoryList.includes(y.subCategory))
              this.subCategoryList.push(y.subCategory);
          });
        }
      });
    });
  }

  accordionMain(item: any) {
    if (this.mainAccordion.includes(item)) {
      this.mainAccordion = this.mainAccordion.filter(i => i !== item);
    } else {
      this.mainAccordion = [];
      this.subAccordion = [];
      this.mainAccordion.push(item);
    }
  }

  accordionSub(mainAcc: any, item: any) {
    console.log(this.mainAccordion)
    console.log(this.subAccordion)
    this.mainAccIndex = mainAcc;

    if (!this.subAccordion.includes(item)) {
      this.subAccordion = [];
      this.subAccordion.push(item);
    }
    else if (this.subAccordion.includes(item) && this.mainAccordion.includes(mainAcc + 1)) {
      this.subAccordion = this.subAccordion.filter((i: any) => i !== item);
    }
    if (!this.mainAccordion.includes(mainAcc + 1)) {
      this.mainAccordion.push(mainAcc + 1);
    }
  }

  search() {
    console.log(this.filterSearchText)
    this.filterSearchText = this.filterSearchText.toLowerCase();

    this.getData();
    let newCategoryList = this.testList;
    this.testList = [];
    newCategoryList.forEach((e: any) => {
      let subHeaderArr: any[] = [];
      let test: any[] = [];
      let subModel = {
        id: null,
        name: null,
        subTestDataList: test
      };
      e.subTestList.forEach((x: any) => {
        let dataArr: any[] = [];
        if (x.subTestDataList != undefined) {
          x.subTestDataList.forEach((y: any) => {
            let lowerCasedCategory = y.category.map((x: any) => x.toLowerCase());
            if (y.id.toString().includes(this.filterSearchText) || lowerCasedCategory.includes(this.filterSearchText) || y.subCategory.toLowerCase().includes(this.filterSearchText) ||
              y.edmFieldName.toLowerCase().includes(this.filterSearchText) || y.edmFieldComponent.toLowerCase().includes(this.filterSearchText) || y.edmFieldExportName.toLowerCase().includes(this.filterSearchText) ||
              y.edmFieldDefinition.toLowerCase().includes(this.filterSearchText) || y.edmFieldMandatory.toLowerCase().includes(this.filterSearchText) ||
              y.edmFieldNormalization.toLowerCase().includes(this.filterSearchText) || y.edmFieldDerivation.toLowerCase().includes(this.filterSearchText) || y.chatGptOutput.toLowerCase().includes(this.filterSearchText) ||
              y.isCustom.toLowerCase().includes(this.filterSearchText) || y.vendorName.toLowerCase().includes(this.filterSearchText) || y.vendorFieldName.toLowerCase().includes(this.filterSearchText) ||
              y.scdFieldName.toLowerCase().includes(this.filterSearchText) || y.scdModelName.toLowerCase().includes(this.filterSearchText) || y.scdFieldDefinition.toLowerCase().includes(this.filterSearchText) ||
              y.scdFieldMandatory.toLowerCase().includes(this.filterSearchText) || y.scdFieldTranslation.toLowerCase().includes(this.filterSearchText) || y.scdFieldFormula.toLowerCase().includes(this.filterSearchText) ||
              y.scdChatGptOutput.toLowerCase().includes(this.filterSearchText) || y.cost.toLowerCase().includes(this.filterSearchText))
              dataArr.push(y);
          });
        }
        if (dataArr.length > 0) {
          subModel = {
            id: x.id,
            name: x.name,
            subTestDataList: dataArr
          };
          if (dataArr.length > 0)
            subHeaderArr.push(subModel);
        }
      });
      let model = {
        id: e.id,
        name: e.name,
        subTestList: subHeaderArr
      }
      if (subHeaderArr.length > 0)
        this.testList.push(model);
    });
  }

  onItemChange(item: any, isSelectedAll: boolean) {
    console.log(item);
    console.log(this.selectedCategoryItems);
    this.getData();
    this.previousCategoryList = [];
    let newCategoryList = this.previousSubCategoryList.length > 0 ? this.previousSubCategoryList : this.testList;
    if (this.selectedCategoryItems.length > 0) {
      this.testList = [];
      newCategoryList.forEach((e: any) => {
        // let headerArr = [];
        let subHeaderArr: any[] = [];
        let test: any[] = [];
        let subModel = {
          id: null,
          name: null,
          subTestDataList: test
        };
        e.subTestList.forEach((x: any) => {
          let dataArr: any[] = [];
          if (x.subTestDataList != undefined) {
            x.subTestDataList.forEach((y: any) => {
              // console.log(y.category)
              if ((y.category.some((r: any) => this.selectedCategoryItems.includes(r)) && isSelectedAll == false) || (y.category.some((r: any) => item.includes(r)) && isSelectedAll == true))
                dataArr.push(y);
            });
          }
          if (dataArr.length > 0) {
            subModel = {
              id: x.id,
              name: x.name,
              subTestDataList: dataArr
            };
            if (dataArr.length > 0)
              subHeaderArr.push(subModel)
            // console.log(subModel)
          }
        });
        let model = {
          id: e.id,
          name: e.name,
          subTestList: subHeaderArr
        }
        if (subHeaderArr.length > 0)
          this.testList.push(model);
      });
      this.previousCategoryList = this.testList;
      // console.log(this.testList)
    }
  }

  onSubCategoryChange(item: any, isSelectedAll: boolean) {
    console.log(this.selectedCategoryItems);
    if (this.selectedCategoryItems.length <= 0)
      this.getData();
    this.previousSubCategoryList = [];
    let newSubCategoryList = this.previousCategoryList.length > 0 ? this.previousCategoryList : this.testList;

    if (this.selectedSubCategoryItems.length > 0) {
      this.testList = [];

      newSubCategoryList.forEach((e: any) => {
        // let headerArr = [];
        let subHeaderArr: any[] = [];
        let test: any[] = [];
        let subModel = {
          id: null,
          name: null,
          subTestDataList: test
        };
        e.subTestList.forEach((x: any) => {
          let dataArr: any[] = [];
          if (x.subTestDataList != undefined) {
            x.subTestDataList.forEach((y: any) => {
              console.log(y.subCategory)
              if ((this.selectedSubCategoryItems.includes(y.subCategory) && isSelectedAll == false) || (item.includes(y.subCategory) && isSelectedAll == true))
                dataArr.push(y);
            });
          }
          if (dataArr.length > 0) {
            subModel = {
              id: x.id,
              name: x.name,
              subTestDataList: dataArr
            };
            if (dataArr.length > 0)
              subHeaderArr.push(subModel)
            console.log(subModel)
          }
        });
        let model = {
          id: e.id,
          name: e.name,
          subTestList: subHeaderArr
        }
        if (subHeaderArr.length > 0)
          this.testList.push(model);
      });
      this.previousSubCategoryList = this.testList;
    }
    else if (this.previousCategoryList.length > 0) {
      this.testList = this.previousCategoryList;
    }
    else {
      this.getData();
    }

    console.log(this.testList)
  }

  sort(property: string, subIndex: any) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    // console.log(this.testList.filter((x: any) => x.id == headerId && x.subTestList.some((y: any) => y.id == subHeaderId)));
    this.testList.filter((x: any) => {
      console.log(x.subTestList[subIndex].subTestDataList);
      [...x.subTestList[subIndex].subTestDataList.sort((a: any, b: any) => {
        let result = 0;
        if (a[property] < b[property]) {
          result = -1;
        }
        if (a[property] > b[property]) {
          result = 1;
        }
        console.log(result * this.sortOrder)
        return result * this.sortOrder;
      })];

    });


  }


  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg', backdrop: 'static' });
  }

  showHideColumn(item: any) {
    console.log(item)
    if (item.showColumn) {
      let selectedColumn = this.defaultViewColumns.find(x => x.columnName === item.columnName);
      console.log(selectedColumn)
      /*this.selectFilterList.push(selectedColumn);*/
    }
    else {
      // this.selectFilterList = this.defaultViewColumns.filter(x => x.columnName !== item.columnName);
    }

  }

  addData(item: any) {
    this.newDataList.push(item.id);
  }

  removeData(item: any) {
    // console.log(this.newDataList)
    const removeIndex = this.newDataList.findIndex(x => x === item.id);
    if (removeIndex !== -1) {
      this.newDataList.splice(removeIndex, 1);
    }
    // console.log(this.newDataList)
  }


  exportData() {
    let newList: any[] = [];
    if (this.testList.length > 0) {
      this.testList.forEach((e: any) => {
        e.subTestList.forEach((x: any) => {
          if (x.subTestDataList != undefined) {
            x.subTestDataList.forEach((y: any) => {
              console.log(y)
              newList.push(y);
            });
          }
        });
      });
    }

    console.log(newList)

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newList);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, 'DataLineageModel' + '.xls');

  }
}
