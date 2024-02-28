import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faColumns, faMinus, faPlus, faRandom, faSearch, faSort } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';
import { DataModel } from '../../Models/data.model';
import { FilterApiService } from '../../Services/filterapi.services';
@Component({
  selector: 'app-data-heirarchy',
  templateUrl: './data-heirarchy.component.html',
  styleUrls: ['./data-heirarchy.component.css']
})
export class DataHeirarchyComponent implements OnInit {

  sortIcon = faSort;
  searchIcon = faSearch;
  columnChooserIcon = faColumns;
  treeIcon = faRandom;
  plusIcon = faPlus;
  minusIcon = faMinus;
  showBox: boolean = false;
  filterSearchText: any;
  headerName: any;
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
  newDataList: any[] = [];
  previousCategoryList: any[] = [];
  previousSubCategoryList: any[] = [];
  sortProperty: string = 'id';
  sortOrder = 1;
  defaultViewColumns = [
    { columnName: "Category", isRequired: true, showColumn: true },
    { columnName: "SubCategory", isRequired: true, showColumn: true },
    { columnName: "EdmFieldName", isRequired: true, showColumn: true },
    { columnName: "EdmFieldComponent", isRequired: true, showColumn: true },
    { columnName: "EdmFieldExportName", isRequired: false, showColumn: false },
    { columnName: "EdmFieldDefinition", isRequired: false, showColumn: false },
    { columnName: "EdmFieldMandatory", isRequired: true, showColumn: true },
    { columnName: "EdmFieldNormalization", isRequired: false, showColumn: false },
    { columnName: "EdmFieldDerivation", isRequired: false, showColumn: false },
    { columnName: "EdmFieldSpecification", isRequired: true, showColumn: true },
    { columnName: "ScdFieldTranslation", isRequired: false, showColumn: false },
    { columnName: "ScdFieldFormula", isRequired: false, showColumn: false },
    { columnName: "ScdFieldSpecification", isRequired: false, showColumn: false },
    { columnName: "IsCustom", isRequired: false, showColumn: false },
    { columnName: "VendorName", isRequired: true, showColumn: true },
    { columnName: "VendorFieldName", isRequired: true, showColumn: true },
    { columnName: "ScdFieldName", isRequired: true, showColumn: true },
    { columnName: "ScdModelName", isRequired: true, showColumn: true },
    { columnName: "ScdFieldDefinition", isRequired: false, showColumn: false },
    { columnName: "ScdFieldMandatory", isRequired: true, showColumn: true },
    { columnName: "Cost", isRequired: true, showColumn: true },

  ];
  modalRef: BsModalRef | any;
  modalRefNormalization: BsModalRef | any;
  modalRef2: BsModalRef | any;
  selecttabbox: any = 1;

  rule: any;
  rowData: any;
  dataArray: any[] = [];
  modelData: any[] = [];


  constructor(
    private modalService: BsModalService,
    private filterapiService: FilterApiService,
    private dialog: MatDialog
  ) {

  }
  ngOnInit() {
    this.getApiData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      classes: "bottom-set custom-class ",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      badgeShowLimit: 1,
    };
  }
  

  getApiData() {
    let sqlQueryGetGridData: any;
    sqlQueryGetGridData =
      `Select DSF.STANDARD_FIELD_ID, DCNT.Client_Name, DCL.Cluster_Id, DCL.Cluster_Name, DSCL.Sub_Cluster_Id, DSCL.Sub_Cluster_Name, DEV.Category_Name, DEV.Sub_Category_Name, DEV.Edm_Field_Name, DEV.Edm_Field_Component,
         DEV.Edm_Field_Export_Name, DEV.edm_field_definition, DEV.edm_field_mandatory, DEV.iscustom, DVM.vendor_name, DVF.vendor_field_name, DSV.scd_field_name,
         dbms_lob.getlength(DEV.edm_field_normalization) AS normalization_length, dbms_lob.getlength(DEV.edm_field_derivation) AS derivation_length,
         dbms_lob.getlength(DEV.edm_field_specification) AS specification_length, dbms_lob.getlength(DSV.scd_field_translation) AS translation_length,
         dbms_lob.getlength(DSV.scd_field_formula) AS formula_length, dbms_lob.getlength(DSV.scd_field_specification) AS scd_specification_length,
         DSV.scd_model_name, DSV.scd_field_definition, DSV.scd_field_mandatory, DSF.cost From DMS_Standard_Fields DSF JOIN DMS_Client DCNT ON DCNT.Client_ID = DSF.Client_ID
         JOIN DMS_Cluster DCL ON DCL.Cluster_ID = DSF.Cluster_ID JOIN DMS_Sub_Cluster DSCL ON DSCL.Cluster_ID = DCL.Cluster_ID JOIN DMS_EDM_VENDOR DEV ON DEV.EDM_FIELD_ID = DSF.EDM_FIELD_ID
         JOIN DMS_VENDOR DVM ON DVM.VENDOR_ID = DSF.VENDOR_ID JOIN DMS_VENDOR_FIELDS DVF ON DVF.VENDOR_FIELD_ID = DSF.VENDOR_FIELD_ID LEFT OUTER JOIN DMS_SCD_VENDOR DSV ON
         DSV.SCD_FIELD_ID = DSF.SCD_FIELD_ID WHERE DCNT.Client_Name = 'STANDARD' AND DCL.Cluster_Name = 'INSTRUMENT' AND DSCL.SUB_Cluster_Name = 'EQUITY'`;

    //this.GetFilterData(sqlQueryGetGridData, true, null).then(async (x) => {
    //  this.rowData = x;
    //  const normalizationPromises: Promise <any> [] =[];
    //  this.dataArray.forEach((y: any, i: any) => {
    //    const normalizationPromise = this.getNormalizationRule(y, i);
    //    normalizationPromises.push(normalizationPromise);
    //  });
    //  await Promise.all(normalizationPromises);
    //});
    //this.getList();

    this.GetFilterData(sqlQueryGetGridData, true, '').then((x) => {
      this.rowData = x;
      this.getList();
      this.getCategoryList();
      this.getSubCategoryList();
      //const normalizationPromises: Promise<any>[] = [];
      //this.dataArray.forEach((y: any, i: any) => {
      //  const normalizationPromise = this.getNormalizationRule(y, i);
      //  normalizationPromises.push(normalizationPromise);
      // });

      //Promise.all(normalizationPromises).then(y => {
      //  console.log(this.dataArray)
      //  if (this.dataArray.length > 0)
      //    this.getList();
      //});
    });


  }

  getList() {
    this.modelData = [];
    let clustersSet = new Set(this.dataArray.map(x => x.CLUSTER_NAME));
    let distinctClusters = Array.from(clustersSet);

    let subClustersSet = new Set(this.dataArray.map(x => x.SUB_CLUSTER_NAME));
    let distinctSubClusters = Array.from(subClustersSet);
    // setTimeout(() => {
    distinctClusters.forEach(x => {
      let subClusterList: any[] = [];
      let clusterModel = {
        clusterId: 0,
        name: x,
        subClusterDataList: subClusterList
      };
      distinctSubClusters.forEach(y => {
        let dataList: any[] = [];
        let subClusterModel = {
          subClusterId: 0,
          name: y,
          gridDataList: dataList
        };
        this.dataArray.forEach(z => {

          if (x == z.CLUSTER_NAME && y == z.SUB_CLUSTER_NAME) {
            let dataModel: DataModel = {
              id: z.STANDARD_FIELD_ID,
              category: z.CATEGORY_NAME,
              subCategory: z.SUB_CATEGORY_NAME,
              edmFieldName: z.EDM_FIELD_NAME,
              edmFieldComponent: z.EDM_FIELD_COMPONENT,
              edmFieldExportName: z.EDM_FIELD_EXPORT_NAME,
              edmFieldDefinition: z.EDM_FIELD_DEFINITION,
              edmFieldMandatory: z.EDM_FIELD_MANDATORY,
              edmFieldNormalizationLength: z.NORMALIZATION_LENGTH,
              edmFieldDerivationLength: z.DERIVATION_LENGTH,
              edmFieldSpecificationLength: z.SPECIFICATION_LENGTH,
              scdFieldTranslationLength: z.TRANSLATION_LENGTH,
              scdFieldFormulaLength: z.FORMULA_LENGTH,
              scdFieldSpecificationLength: z.SCD_SPECIFICATION_LENGTH,
              isCustom: z.ISCUSTOM,
              vendorName: z.VENDOR_NAME,
              vendorFieldName: z.VENDOR_FIELD_NAME,
              scdFieldName: z.SCD_FIELD_NAME,
              scdModelName: z.SCD_MODEL_NAME,
              scdFieldDefinition: z.SCD_FIELD_DEFINITION,
              scdFieldMandatory: z.SCD_FIELD_MANDATORY,
              cost: z.COST,
            }
            subClusterModel.gridDataList.push(dataModel);
            subClusterModel.subClusterId = z.SUB_CLUSTER_ID;
            clusterModel.clusterId = z.CLUSTER_ID;

          }

        });
        if (subClusterModel.gridDataList.length > 0)
          clusterModel.subClusterDataList.push(subClusterModel);


      });
      this.modelData.push(clusterModel);
    });
    //  }, 500);
  }

  getNormalizationRule(fieldLength: number, standardId: any, columnName: any) {
    if (fieldLength <= 2000) {
      let sqlQueryGetGridData: any;
      if (columnName == 'edm_field_normalization' || columnName == 'edm_field_derivation' || columnName == 'edm_field_specification') {
        sqlQueryGetGridData = `Select DBMS_LOB.SUBSTR(DEV.${columnName}, ${fieldLength}) AS normalization_rule From DMS_EDM_VENDOR DEV
                             join DMS_Standard_Fields DSF ON DEV.EDM_FIELD_ID = DSF.EDM_FIELD_ID WHERE DSF.STANDARD_FIELD_ID = ${standardId}`
      }
      if (columnName == 'scd_field_translation' || columnName == 'scd_field_formula' || columnName == 'scd_field_specification') {
        sqlQueryGetGridData = `Select DBMS_LOB.SUBSTR(DSV.${columnName}, ${fieldLength}) AS normalization_rule From DMS_SCD_VENDOR DSV
                             join DMS_Standard_Fields DSF ON DSV.SCD_FIELD_ID = DSF.SCD_FIELD_ID WHERE DSF.STANDARD_FIELD_ID = ${standardId}`
      }
      this.GetFilterData(sqlQueryGetGridData, false, '').then((x) => {
        this.rule = x.rows[0][0];
        console.log(this.rule)
      });
    }
    else {
      let result = Math.trunc(fieldLength / 2000);
      var remainder = fieldLength % 2000;
      let completeNormalizationRule = "";
      let startingIndex = 1;

      for (let i = 1; i <= result; i++) {
        let sqlQueryGetGridData: any;
        if (columnName == 'edm_field_normalization' || columnName == 'edm_field_derivation' || columnName == 'edm_field_specification') {
          sqlQueryGetGridData = `Select DBMS_LOB.SUBSTR(DEV.${columnName}, 2000, ${startingIndex}) AS normalization_rule From DMS_EDM_VENDOR DEV
                               join DMS_Standard_Fields DSF ON DEV.EDM_FIELD_ID = DSF.EDM_FIELD_ID WHERE DSF.STANDARD_FIELD_ID = ${standardId}`
        }
        if (columnName == 'scd_field_translation' || columnName == 'scd_field_formula' || columnName == 'scd_field_specification') {
          sqlQueryGetGridData = `Select DBMS_LOB.SUBSTR(DSV.${columnName}, 2000, ${startingIndex}) AS normalization_rule From DMS_SCD_VENDOR DSV
                             join DMS_Standard_Fields DSF ON DSV.SCD_FIELD_ID = DSF.SCD_FIELD_ID WHERE DSF.STANDARD_FIELD_ID = ${standardId}`
        }
        this.GetFilterData(sqlQueryGetGridData, false, '').then((x) => {
          completeNormalizationRule = completeNormalizationRule.concat(x.rows[0][0]);
        });
        startingIndex = startingIndex + 2000;
      }
      setTimeout(() => {
        if (remainder > 0) {
          let sqlQueryGetGridData: any;
          if (columnName == 'edm_field_normalization' || columnName == 'edm_field_derivation' || columnName == 'edm_field_specification') {
            sqlQueryGetGridData = `Select DBMS_LOB.SUBSTR(DEV.${columnName}, ${remainder}, ${startingIndex}) AS normalization_rule From DMS_EDM_VENDOR DEV
                                 join DMS_Standard_Fields DSF ON DEV.EDM_FIELD_ID = DSF.EDM_FIELD_ID WHERE DSF.STANDARD_FIELD_ID = ${standardId}`
          }
          if (columnName == 'scd_field_translation' || columnName == 'scd_field_formula' || columnName == 'scd_field_specification') {
            sqlQueryGetGridData = `Select DBMS_LOB.SUBSTR(DSV.${columnName}, ${remainder}, ${startingIndex}) AS normalization_rule From DMS_SCD_VENDOR DSV
                             join DMS_Standard_Fields DSF ON DSV.SCD_FIELD_ID = DSF.SCD_FIELD_ID WHERE DSF.STANDARD_FIELD_ID = ${standardId}`
          }
          this.GetFilterData(sqlQueryGetGridData, false, '').then((x) => {
            completeNormalizationRule = completeNormalizationRule.concat(x.rows[0][0]);
            this.rule = completeNormalizationRule;
            console.log(this.rule)
            // this.dataArray[index].NORMALIZATION_RULE = this.normalizationRuleData;

          });
        }

      }, 500);
    }

  }

  getCategoryList() {
    this.modelData.forEach((e: any) => {
      e.subClusterDataList.forEach((x: any) => {
        if (x.gridDataList != undefined) {
          x.gridDataList.forEach((y: any) => {
            let categoryArray: string[] = y.category.split(', ');
            categoryArray.forEach((c: any) => {
              if (!this.categoryList.includes(c))
                this.categoryList.push(c);
            });
          });
        }
      });
    });
  }

  getSubCategoryList() {
    this.modelData.forEach((e: any) => {
      e.subClusterDataList.forEach((x: any) => {
        if (x.gridDataList != undefined) {
          x.gridDataList.forEach((y: any) => {
            let subCategoryArray: string[] = y.subCategory.split(', ');
            subCategoryArray.forEach((c: any) => {
              if (!this.subCategoryList.includes(c))
                this.subCategoryList.push(c);
            });
          });
        }
      });
    });
  }


  //accordionMain(item: any) {
  //  console.log(this.mainAccordion)
  //  console.log(this.subAccordion)
  // // console.log(item);

  //  if (this.mainAccordion.includes(item)) {
  //    this.mainAccordion = this.mainAccordion.filter(i => i !== item);
  //  } else {
  //    this.mainAccordion.push(item);
  //  }
  //}

  //accordionSub(mainAcc: any, item: any) {
  //  console.log(this.mainAccordion)
  //  console.log(this.subAccordion)
  //  this.mainAccIndex = mainAcc;

  //  if (!this.subAccordion.includes(item)) {
  //    this.subAccordion.push(item);
  //  }
  //  else if (this.subAccordion.includes(item) && this.activeAccordion.includes(mainAcc + 1)) {
  //    this.subAccordion = this.subAccordion.filter((i: any) => i !== item);
  //  }
  //  if (!this.activeAccordion.includes(mainAcc + 1)) {
  //    this.activeAccordion.push(mainAcc + 1);
  //  }
  //}


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
    console.log(this.modelData)
    let newCategoryList = this.modelData;
    this.modelData = [];
    if (this.filterSearchText == "") {
      this.getApiData();
      return;
    }

    newCategoryList.forEach((e: any) => {
      let subHeaderArr: any[] = [];
      let test: any[] = [];
      let subModel = {
        subClusterId: null,
        name: null,
        gridDataList: test
      };
      e.subClusterDataList.forEach((x: any) => {
        let dataArr: any[] = [];
        if (x.gridDataList != undefined) {
          x.gridDataList.forEach((y: any) => {
            console.log(y.category)
            let idFilter = y.id.toString() != null ? y.id.toString().includes(this.filterSearchText) : false;
            let categoryFilter = y.category != null ? y.category.toLowerCase().includes(this.filterSearchText) : false;
            let subCategoryFilter = y.subCategory != null ? y.subCategory.toLowerCase().includes(this.filterSearchText) : false;
            let edmFieldNameFilter = y.edmFieldName != null ? y.edmFieldName.toLowerCase().includes(this.filterSearchText) : false;
            let edmFieldComponentFilter = y.edmFieldComponent != null ? y.edmFieldComponent.toLowerCase().includes(this.filterSearchText) : false;
            let edmFieldExportNameFilter = y.edmFieldExportName != null ? y.edmFieldExportName.toLowerCase().includes(this.filterSearchText) : false;
            let edmFieldDefinitionFilter = y.edmFieldDefinition != null ? y.edmFieldDefinition.toLowerCase().includes(this.filterSearchText) : false;
            let edmFieldMandatoryFilter = y.edmFieldMandatory != null ? y.edmFieldMandatory.toLowerCase().includes(this.filterSearchText) : false;
            let isCustomFilter = y.isCustom != null ? y.isCustom.toLowerCase().includes(this.filterSearchText) : false;
            let vendorNameFilter = y.vendorName != null ? y.vendorName.toLowerCase().includes(this.filterSearchText) : false;
            let vendorFieldNameFilter = y.vendorFieldName != null ? y.vendorFieldName.toLowerCase().includes(this.filterSearchText) : false;
            let scdFieldNameFilter = y.scdFieldName != null ? y.scdFieldName.toLowerCase().includes(this.filterSearchText) : false;
            let scdModelNameFilter = y.scdModelName != null ? y.scdModelName.toLowerCase().includes(this.filterSearchText) : false;
            let scdFieldDefinitionFilter = y.scdFieldDefinition != null ? y.scdFieldDefinition.toLowerCase().includes(this.filterSearchText) : false;
            let scdFieldMandatoryFilter = y.scdFieldMandatory != null ? y.scdFieldMandatory.toLowerCase().includes(this.filterSearchText) : false;
            let costFilter = y.cost.toString() != null ? y.cost.toString().includes(this.filterSearchText) : false;


            if (idFilter == true || categoryFilter == true || subCategoryFilter == true || edmFieldNameFilter == true ||
              edmFieldComponentFilter == true || edmFieldExportNameFilter == true || edmFieldDefinitionFilter == true ||
              edmFieldMandatoryFilter == true || isCustomFilter == true || vendorNameFilter == true || vendorFieldNameFilter == true ||
              scdFieldNameFilter == true || scdModelNameFilter == true || scdFieldDefinitionFilter == true ||
              scdFieldMandatoryFilter == true || costFilter == true) {
              dataArr.push(y);
            }

          });
        }
        subModel = {
          subClusterId: x.subClusterId,
          name: x.name,
          gridDataList: dataArr
        };
        subHeaderArr.push(subModel);
      });
      let model = {
        clusterId: e.clusterId,
        name: e.name,
        subClusterDataList: subHeaderArr
      }
      this.modelData.push(model);
    });
    console.log(this.modelData)
  }

  onItemChange(item: any, isSelectedAll: boolean) {
    this.getList();
    if (this.selectedCategoryItems.length == 0 && this.selectedSubCategoryItems.length == 0)
      return;

    let newCategoryList = this.modelData;
    this.modelData = [];
    if (isSelectedAll == true)
      this.selectedCategoryItems = item;
    newCategoryList.forEach((e: any) => {
      let subHeaderArr: any[] = [];
      let test: any[] = [];
      let subModel = {
        subClusterId: null,
        name: null,
        gridDataList: test
      };
      e.subClusterDataList.forEach((x: any) => {
        let dataArr: any[] = [];
        if (x.gridDataList != undefined) {
          x.gridDataList.forEach((y: any) => {
            let categoryArray: string[] = y.category.split(', ');
            let subcategoryArray: string[] = y.subCategory.split(', ');
            let selectedCondition = this.selectedSubCategoryItems.length > 0 ? subcategoryArray.some((r: any) => this.selectedSubCategoryItems.includes(r)) &&
              categoryArray.some((r: any) => this.selectedCategoryItems.includes(r)) : categoryArray.some((r: any) => this.selectedCategoryItems.includes(r))

            if (selectedCondition == true || (this.selectedCategoryItems.length <= 0 && this.selectedSubCategoryItems.length > 0 && subcategoryArray.some((r: any) => this.selectedSubCategoryItems.includes(r)))) {
              dataArr.push(y);
            }
          });
        }
        subModel = {
          subClusterId: x.subClusterId,
          name: x.name,
          gridDataList: dataArr
        };
        subHeaderArr.push(subModel);
      });
      let model = {
        clusterId: e.clusterId,
        name: e.name,
        subClusterDataList: subHeaderArr
      }
      this.modelData.push(model);
    });
  }

  onSubCategoryChange(item: any, isSelectedAll: boolean) {
    this.getList();
    if (this.selectedSubCategoryItems.length == 0 && this.selectedCategoryItems.length == 0)
      return;

    let newSubCategoryList = this.modelData;
    this.modelData = [];
    if (isSelectedAll == true)
      this.selectedSubCategoryItems = item;
    newSubCategoryList.forEach((e: any) => {
      let subHeaderArr: any[] = [];
      let test: any[] = [];
      let subModel = {
        subClusterId: null,
        name: null,
        gridDataList: test
      };
      e.subClusterDataList.forEach((x: any) => {
        let dataArr: any[] = [];
        if (x.gridDataList != undefined) {
          x.gridDataList.forEach((y: any) => {
            let subcategoryArray: string[] = y.subCategory.split(', ');
            let categoryArray: string[] = y.category.split(', ');
            let selectedCondition = this.selectedCategoryItems.length > 0 ? categoryArray.some((r: any) => this.selectedCategoryItems.includes(r)) &&
              subcategoryArray.some((r: any) => this.selectedSubCategoryItems.includes(r)) : subcategoryArray.some((r: any) => this.selectedSubCategoryItems.includes(r))

            if (selectedCondition == true || (this.selectedSubCategoryItems.length <= 0 && this.selectedCategoryItems.length > 0 && categoryArray.some((r: any) => this.selectedCategoryItems.includes(r)))) {
              dataArr.push(y);
            }
          });
        }
        subModel = {
          subClusterId: x.subClusterId,
          name: x.name,
          gridDataList: dataArr
        };
        subHeaderArr.push(subModel);
      });
      let model = {
        clusterId: e.clusterId,
        name: e.name,
        subClusterDataList: subHeaderArr
      }
      this.modelData.push(model);
    });

  }

  sort(property: string, subIndex: any) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    // console.log(this.testList.filter((x: any) => x.id == headerId && x.subTestList.some((y: any) => y.id == subHeaderId)));
    this.modelData.filter((x: any) => {
      console.log(x.subClusterDataList[subIndex].gridDataList);
      [...x.subClusterDataList[subIndex].gridDataList.sort((a: any, b: any) => {
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


  exportData(headerData: any, subHeaderData: any) {
    let newList: any[] = [];
    if (this.modelData.length > 0 && headerData.clusterId != null) {
      this.modelData.forEach((e: any) => {
        if (e.clusterId == headerData.clusterId) {
          e.subClusterDataList.forEach((x: any) => {
            if (x.gridDataList != undefined && (subHeaderData == null || (subHeaderData.subClusterId != null && x.subClusterId == subHeaderData.subClusterId))) {
              x.gridDataList.forEach((y: any) => {
                console.log(y)
                newList.push(y);
              });
            }
          });
        }
      });
    }

    let exportName: any;
    exportName = subHeaderData == null ? headerData.name : headerData.name + "_" + subHeaderData.name;

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newList);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, exportName + '.xlsx');

  }


  //saveAsExcelFile(buffer: any, fileName: string): void {
  //  import("file-saver").then(FileSaver => {
  //    let EXCEL_TYPE =
  //      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  //    let EXCEL_EXTENSION = ".xlsx";
  //    const data: Blob = new Blob([buffer], {
  //      type: EXCEL_TYPE
  //    });

  //    FileSaver.saveAs(
  //      data,
  //      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
  //    );
  //  });

  //}
  openNormalizationRuleModal(template: TemplateRef<any>, fieldLength: number, standardFieldId: string, columnName: any, headerName: any) {
    this.rule = [];
    this.headerName = headerName;
    this.getNormalizationRule(fieldLength, standardFieldId, columnName);

    // this.normalizationRule = normalizationRule;
    //if (normalizationRule.length <= 300)
    //  this.modalRefNormalization = this.modalService.show(template, { class: 'gray modal-sm', backdrop: 'static' });
    //if (normalizationRule.length >= 300 && normalizationRule.length <= 600)
    //  this.modalRefNormalization = this.modalService.show(template, { class: 'gray modal-md', backdrop: 'static' });
    //else
    this.modalRefNormalization = this.modalService.show(template, { class: 'gray modal-lg', backdrop: 'static' });
  }

  getLinesToCopy(): string {
    return this.rule;
  }

  data: any[] = [];

  async GetFilterData(sqlQuery: string, isAdded: boolean, type: any): Promise<any> {
    try {
      const response = await this.filterapiService.getData(sqlQuery).toPromise();

      this.data = response;

      for (let i = 0; i < response.rows.length; i++) {
        const keyValueData: { [key: string]: string } = {};
        response.metaData.forEach((meta: any, j: any) => {
          const key = meta.name;
          const value = response.rows[i][j];
          keyValueData[key] = value;

        });
        if (isAdded)
          this.dataArray.push(keyValueData);
      }
      return this.data;
    }
    catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


}
