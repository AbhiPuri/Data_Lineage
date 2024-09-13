import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faCheckSquare, faColumns, faFileExport, faListCheck, faMinus, faPlus, faRandom, faSearch, faSort, faSquareCheck, faTh } from '@fortawesome/free-solid-svg-icons';
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
  exportIcon = faFileExport;
  selectedExportIcon = faListCheck;
  /* columnChooserIcon = faColumns;*/
  columnChooserIcon = faTh;
  treeIcon = faRandom;
  plusIcon = faPlus;
  minusIcon = faMinus;
  isSelectedExported: boolean = false;
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
  clusterAccordion: any[] = [];
  subAccordion: any[] = [];
  mainAccIndex: any = null;
  subAcc: any[][] = [[]];
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
  exportModalRef: BsModalRef | any;
  selectTabBox: any = 1;

  rule: any;
  rowData: any;
  dataArray: any[] = [];
  modelData: any[] = [];
  allData: any[] = [];
  testList: any[] = [];
  excelExports = [
    { id: 1, title: "Export Excel on different Sheets" },
    { id: 2, title: "Export Excel on one Sheet" }
  ];
  exportValue: any;

  constructor(
    private modalService: BsModalService,
    private filterapiService: FilterApiService,
    private dialog: MatDialog
  ) {

  }
  ngOnInit() {
  //  this.getData();
    this.getApiData();
    // this.getExportData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      classes: "bottom-set custom-class ",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      badgeShowLimit: 1,
    };
  }




  getData() {
    this.testList = [
      {
        clusterId: 1,
        name: 'Instrument',
        subClusterDataList: [
          {
            subClusterId: 1,
            name: 'Equity',
            gridDataList: [
              {
                id: 38,
                category: 'Identifiers',
                subCategory: 'Instr Identifiers, Vendor Identifier, Codes, Standards',
                edmFieldName: 'BloombergCode',
                edmFieldComponent: 'Instrument',
                edmFieldMandatory: 'O',
                vendorName: 'Bloomberg',
                vendorFieldName: 'ID_BB_GLOBAL',
                cost: 4
              },
              {
                id: 39,
                category: 'Regulation, Compliance, Classification',
                subCategory: 'Characteristics, Reference Data',
                edmFieldName: 'Country',
                edmFieldComponent: 'Instrument',
                edmFieldMandatory: 'R',
                vendorName: 'Bloomberg',
                vendorFieldName: 'COUNTRY',
                cost: 5
              },
            ]

          },
          {
            subClusterId: 2,
            name: 'Bond',
            gridDataList: [
              {
                id: 40,
                category: 'Regulation, Static',
                subCategory: 'Classification, CSDR, MIFID, MIFIR',
                edmFieldName: 'CFICode',
                edmFieldComponent: 'Instrument',
                edmFieldMandatory: 'R',
                vendorName: 'Bloomberg',
                vendorFieldName: 'BLOOMBERG_CFI_CODE',
                cost: 7
              },
              {
                id: 41,
                category: 'Regulation',
                subCategory: 'Rating',
                edmFieldName: 'Rating',
                edmFieldComponent: 'Rating',
                edmFieldMandatory: 'O',
                vendorName: 'Bloomberg',
                vendorFieldName: 'RTG_SP_LONG',
                cost: 7
              },
            ]
          },
        ]
      },
      {
        clusterId: 2,
        name: 'Services',
        subClusterDataList: [
          {
            subClusterId: 1,
            name: 'IAS',
            gridDataList: [
              {
                id: 42,
                category: 'Regulation, Compliance',
                subCategory: 'Classifications, CSDR, GICS, BICS, LRS Classifications',
                edmFieldName: 'BusinessClassLevel5',
                edmFieldComponent: 'BusinessClassificationTimeSeries',
                edmFieldMandatory: 'O',
                vendorName: 'Bloomberg',
                vendorFieldName: 'BICS_LEVEL_3_INDUSTRY_CODE',
                cost: 2
              },
              {
                id: 43,
                category: 'Identifiers',
                subCategory: 'Instr Identifiers, Vendor Identifier, Codes, Standards',
                edmFieldName: 'CUSIP',
                edmFieldComponent: 'Instrument',
                edmFieldMandatory: 'O',
                vendorName: 'Bloomberg',
                vendorFieldName: 'ID_CUSIP',
                cost: 2
              },
              {
                id: 44,
                category: 'Static',
                subCategory: 'Characteristics, Flags',
                edmFieldName: 'RegisteredHolder',
                edmFieldComponent: 'Equity',
                edmFieldMandatory: 'O',
                vendorName: 'Bloomberg',
                vendorFieldName: 'REGISTERED',
                cost: 3
              },
              {
                id: 45,
                category: 'Regulation',
                subCategory: 'Instr Identifiers, Vendor Identifier',
                edmFieldName: 'ISIN',
                edmFieldComponent: 'Instrument',
                edmFieldMandatory: 'O',
                vendorName: 'Bloomberg',
                vendorFieldName: 'ID_ISIN',
                cost: 3
              },
            ]
          },
          {
            subClusterId: 2,
            name: 'IOS',
            gridDataList: [
              {
                id: 46,
                category: 'Regulation, Compliance, Classification',
                subCategory: 'Classifications, CSDR, GICS, BICS, LRS Classifications',
                edmFieldName: 'BusinessClassLevel5',
                edmFieldComponent: 'BusinessClassificationTimeSeries',
                edmFieldMandatory: 'O',
                vendorName: 'Bloomberg',
                vendorFieldName: 'BICS_LEVEL_3_INDUSTRY_CODE',
                cost: 1
              },
              {
                id: 47,
                category: 'Static',
                subCategory: 'Characteristics, Dividend',
                edmFieldName: 'DividendCcy',
                edmFieldComponent: 'Dividend',
                edmFieldMandatory: 'O',
                vendorName: 'Bloomberg',
                vendorFieldName: 'DVD_CRNCY',
                cost: 2
              }
            ]
          },
        ]
      },
    ];
  }


  getApiData() {
    let sqlQueryGetGridData: any;
    sqlQueryGetGridData =
      `Select DSF.STANDARD_FIELD_ID, DCNT.Client_Name, DEV.Cluster_Id, DCL.Cluster_Name, DEV.Sub_Cluster_Id, DSCL.Sub_Cluster_Name, DEV.Category_Name, DEV.Sub_Category_Name, 
      DEV.Edm_Field_Name, DEV.Edm_Field_Component, DEV.Edm_Field_Export_Name, DEV.edm_field_definition, DEV.edm_field_mandatory, DEV.iscustom, DVM.vendor_name, DVF.vendor_field_name, 
      DSV.scd_field_name, dbms_lob.getlength(DEV.edm_field_normalization) AS normalization_length, dbms_lob.getlength(DEV.edm_field_derivation) AS derivation_length, 
      dbms_lob.getlength(DEV.edm_field_specification) AS specification_length, dbms_lob.getlength(DEV.EDM_PLAUSIBILITY_CODE) AS edm_plausicode_length, 
      dbms_lob.getlength(DEV.EDM_PLAUSIBILITY_SPECIFICATION) AS edm_plausispec_length, dbms_lob.getlength(DEV.EDM_VALIDATION_CODE) AS edm_validcode_length, 
      dbms_lob.getlength(DEV.EDM_VALIDATION_SPECIFICATION) AS edm_validspec_length, dbms_lob.getlength(DSV.scd_field_translation) AS translation_length, 
      dbms_lob.getlength(DSV.scd_field_formula) AS formula_length, dbms_lob.getlength(DSV.scd_field_specification) AS scd_specification_length, DSV.scd_model_name, 
      DSV.scd_field_definition, DSV.scd_field_mandatory, DSF.cost From DMS_Standard_Fields DSF JOIN DMS_Client DCNT ON DCNT.Client_ID = DSF.Client_ID 
      JOIN DMS_EDM_VENDOR DEV ON DEV.EDM_FIELD_ID = DSF.EDM_FIELD_ID JOIN DMS_Cluster DCL ON DCL.Cluster_ID = DEV.Cluster_ID 
      JOIN DMS_Sub_Cluster DSCL ON DSCL.SUB_CLUSTER_ID = DEV.SUB_CLUSTER_ID JOIN DMS_VENDOR DVM ON DVM.VENDOR_ID = DSF.VENDOR_ID 
      JOIN DMS_VENDOR_FIELDS DVF ON DVF.VENDOR_FIELD_ID = DSF.VENDOR_FIELD_ID LEFT OUTER JOIN  DMS_SCD_VENDOR DSV ON DSV.SCD_FIELD_ID = DSF.SCD_FIELD_ID 
      WHERE DCNT.Client_Name = 'STANDARD' AND DCL.Cluster_Name = 'INSTRUMENT' AND DSCL.SUB_Cluster_Name IN ('EQUITY', 'BOND') ORDER BY DSF.STANDARD_FIELD_ID`;

    this.GetFilterData(sqlQueryGetGridData, true).then((x) => {
      this.rowData = x;
      this.getList();
      this.getCategoryList();
      this.getSubCategoryList();

    });
  }


  getExportData() {
    let exportsqlQueryData: any;
    /* exportsqlQueryData = `Select DBMS_LOB.READ(DEV.edm_field_normalization) AS edm_normalization From DMS_EDM_VENDOR DEV`;*/
    exportsqlQueryData = `Select edm_field_normalization From DMS_EDM_VENDOR Where EDM_FIELD_ID = '2'`;
    /* exportsqlQueryData = `Select DBMS_LOB.SUBSTR(edm_field_normalization, DBMS_LOB.GETLENGTH(edm_field_normalization), 1) AS normalization_rule From DMS_EDM_VENDOR Where DBMS_LOB.GETLENGTH(edm_field_normalization) <= 4000`;*/
    //exportsqlQueryData = `DECLARE v_clob_column1 CLOB;
    //BEGIN
    //Select DBMS_LOB.SUBSTR(edm_field_normalization, DBMS_LOB.GETLENGTH(edm_field_normalization), 1) AS normalization_rule From DMS_EDM_VENDOR;
    //END;`


    //exportsqlQueryData =
    //  `Select DSF.STANDARD_FIELD_ID, DCNT.Client_Name, DCL.Cluster_Id, DCL.Cluster_Name, DSCL.Sub_Cluster_Id, DSCL.Sub_Cluster_Name, DEV.Category_Name, DEV.Sub_Category_Name, DEV.Edm_Field_Name, DEV.Edm_Field_Component,
    //     DEV.Edm_Field_Export_Name, DEV.edm_field_definition, DEV.edm_field_mandatory, DEV.iscustom, DVM.vendor_name, DVF.vendor_field_name, DSV.scd_field_name,
    //     DBMS_LOB.GETCLOBVAL(DEV.edm_field_normalization) AS edm_normalization, DSV.scd_model_name, DSV.scd_field_definition, DSV.scd_field_mandatory, DSF.cost From DMS_Standard_Fields DSF JOIN DMS_Client DCNT ON DCNT.Client_ID = DSF.Client_ID
    //     JOIN DMS_Cluster DCL ON DCL.Cluster_ID = DSF.Cluster_ID JOIN DMS_Sub_Cluster DSCL ON DSCL.Cluster_ID = DCL.Cluster_ID JOIN DMS_EDM_VENDOR DEV ON DEV.EDM_FIELD_ID = DSF.EDM_FIELD_ID
    //     JOIN DMS_VENDOR DVM ON DVM.VENDOR_ID = DSF.VENDOR_ID JOIN DMS_VENDOR_FIELDS DVF ON DVF.VENDOR_FIELD_ID = DSF.VENDOR_FIELD_ID LEFT OUTER JOIN DMS_SCD_VENDOR DSV ON
    //     DSV.SCD_FIELD_ID = DSF.SCD_FIELD_ID WHERE DCNT.Client_Name = 'STANDARD' AND DCL.Cluster_Name = 'INSTRUMENT' AND DSCL.SUB_Cluster_Name = 'EQUITY'`;

    this.GetFilterData(exportsqlQueryData, true).then((x) => {
      console.log(x);
      //this.rowData = x;
      //this.getList();
      //this.getCategoryList();
      //this.getSubCategoryList();

    });
  }


  getList() {
    this.modelData = [];
    this.allData = [];
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
      this.allData.push(clusterModel);
    });
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
      this.GetFilterData(sqlQueryGetGridData, false).then((x) => {

        this.rule = x.rows[0][0];
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
        this.GetFilterData(sqlQueryGetGridData, false).then((x) => {
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
          this.GetFilterData(sqlQueryGetGridData, false).then((x) => {
            completeNormalizationRule = completeNormalizationRule.concat(x.rows[0][0]);

            this.rule = completeNormalizationRule;
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

  accordionMain(item: any, clusterName: any) {
    if (this.mainAccordion.includes(item)) {
      this.mainAccordion = this.mainAccordion.filter(i => i !== item);
    } else {
      this.mainAccordion = [];
      this.subAccordion = [];
      this.mainAccordion.push(item);
      this.clusterAccordion = [...this.clusterAccordion, clusterName];
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
    this.getList();
    if (this.filterSearchText == "") {
      return;
    }
    this.filterSearchText = this.filterSearchText.toLowerCase();
    let newCategoryList = this.modelData;
    this.modelData = [];

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
    this.modelData.filter((x: any) => {
      [...x.subClusterDataList[subIndex].gridDataList.sort((a: any, b: any) => {
        let result = 0;
        if (a[property] < b[property]) {
          result = -1;
        }
        if (a[property] > b[property]) {
          result = 1;
        }
        return result * this.sortOrder;
      })];
    });
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg', backdrop: 'static' });
  }

  showHideColumn(item: any) {
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
    this.newDataList = [...this.newDataList, item.id];
  }

  removeData(item: any) {
    const removeIndex = this.newDataList.indexOf(item.id);
    if (removeIndex !== -1) {
      this.newDataList = [
        ...this.newDataList.slice(0, removeIndex),
        ...this.newDataList.slice(removeIndex + 1)
      ];
    }
  }


  exportData(headerData: any, subHeaderData: any, filterValue: any) {
    let newList: any[] = [];
    let exportName: any;
    if (filterValue == 'all') {
      this.allData.forEach((e: any) => {
        e.subClusterDataList.forEach((x: any) => {
          x.gridDataList.forEach((y: any) => {
            const row = {
            clusterName: e.name,
            subClusterName: x.name,
            ...y
          };
          newList.push(row);
          });
        });
      });
  
      exportName = "Export_All_Data";
    }

    else if (filterValue == 'selected') {
      this.allData.forEach((e: any) => {
        e.subClusterDataList.forEach((x: any) => {
          x.gridDataList.forEach((y: any) => {
            if (this.newDataList.includes(y.id)) {
              const row = {
                clusterName: e.name,
                subClusterName: x.name,
                ...y
              };
              newList.push(row);
            }
          });
        });
      });
      exportName = "Export_Selected_Data";
    }

    else {
      if (this.modelData.length > 0 && headerData.clusterId != null && filterValue != 'all' && filterValue != 'selected') {
        this.modelData.forEach((e: any) => {
          if (e.clusterId == headerData.clusterId) {
            e.subClusterDataList.forEach((x: any) => {
              if (x.gridDataList != undefined && (subHeaderData == null || (subHeaderData.subClusterId != null && x.subClusterId == subHeaderData.subClusterId))) {
                x.gridDataList.forEach((y: any) => {
                  const row = {
                    clusterName: e.name,
                    subClusterName: x.name,
                    ...y
                  };
                  newList.push(row);
                });
              }
            });
          }
        });
        exportName = subHeaderData == null ? headerData.name : headerData.name + "_" + subHeaderData.name;
      }
    }

    let filteredList = newList.map((item: any) => {
      return {
        Cluster: item.clusterName,
        Sub_Cluster: item.subClusterName,
        Id: item.id,
        Category: item.category,
        Sub_Category: item.subCategory,
        Edm_Field_Name: item.edmFieldName,
        Edm_Field_Component: item.edmFieldComponent,
        Edm_Field_Export_Name: item.edmFieldExportName,
        Edm_Field_Definition: item.edmFieldDefinition,
        Edm_Field_Mandatory: item.edmFieldMandatory,
        Is_Custom: item.isCustom,
        Vendor_Name: item.vendorName,
        Vendor_Field_Name: item.vendorFieldName,
        Scd_Field_Name: item.scdFieldName,
        Scd_Model_Name: item.scdModelName,
        Scd_Field_Definition: item.scdFieldDefinition,
        Scd_Field_Mandatory: item.scdFieldMandatory,
        Cost: item.cost,
      
      };
    });
      //Cluster: item.clusterName,
        //Sub_Cluster: item.subClusterName,
        //Id: item.id,
        //Category: item.category,
        //Sub_Category: item.subCategory,
        //Edm_Field_Name: item.edmFieldName,
        //Edm_Field_Component: item.edmFieldComponent,
        //Edm_Field_Export_Name: item.edmFieldExportName,
        //Edm_Field_Definition: item.edmFieldDefinition,
        //Edm_Field_Mandatory: item.edmFieldMandatory,
        //Edm_Field_Normalization: this.getNormalizationRule(item.edmFieldNormalizationLength, item.id, 'edm_field_normalization'),
        //Is_Custom: item.isCustom,
        //Vendor_Name: item.vendorName,
        //Vendor_Field_Name: item.vendorFieldName,
        //Scd_Field_Name: item.scdFieldName,
        //Scd_Model_Name: item.scdModelName,
        //Scd_Field_Definition: item.scdFieldDefinition,
        //Scd_Field_Mandatory: item.scdFieldMandatory,
        //Cost: item.cost,

    setTimeout(() => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredList);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, ws, exportName);
      XLSX.writeFile(workbook, exportName + '.xlsx');
      this.exportModalRef.hide();
    }, 1000);
  }

  //exportData(headerData: any, subHeaderData: any, filterValue: any) {
  //  let newList: any[] = [];
  //  let exportName: any;
  //  if (filterValue == 'all') {
  //    //this.allData.forEach((e: any) => {
  //    //  e.subClusterDataList.forEach((x: any) => {
  //    //    x.gridDataList.forEach((y: any) => {
  //    //      newList.push({ subCluster: x.name, data: y });
  //    //    });
  //    //  });
  //    //});
  //    this.testList.forEach((e: any) => {
  //      e.subClusterDataList.forEach((x: any) => {
  //        x.gridDataList.forEach((y: any) => {
  //          newList.push({ subCluster: `${e.name}_${x.name}` , data: y });
  //        });
  //      });
  //    });
  //    exportName = "Export_All_Data";
  //  }

  //  else if (filterValue == 'selected') {
  //    this.allData.forEach((e: any) => {
  //      e.subClusterDataList.forEach((x: any) => {
  //        x.gridDataList.forEach((y: any) => {
  //          if (this.newDataList.includes(y.id))
  //            newList.push({ subCluster: x.name, data: y });
  //        });
  //      });
  //    });
  //    exportName = "Export_Selected_Data";
  //  }

  //  else {
  //    if (this.modelData.length > 0 && headerData.clusterId != null && filterValue != 'all' && filterValue != 'selected') {
  //      this.testList.forEach((e: any) => {
  //        /* this.modelData.forEach((e: any) => {*/
  //        if (e.clusterId == headerData.clusterId) {
  //          e.subClusterDataList.forEach((x: any) => {
  //            if (x.gridDataList != undefined && (subHeaderData == null || (subHeaderData.subClusterId != null && x.subClusterId == subHeaderData.subClusterId))) {
  //              x.gridDataList.forEach((y: any) => {
  //                newList.push({ subCluster: x.name, data: y });
  //              });
  //            }
  //          });
  //        }
  //      });
  //      exportName = subHeaderData == null ? headerData.name : headerData.name + "_" + subHeaderData.name;
  //    }
  //  }


  //  setTimeout(() => {
  //    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  //    let subClusters: any[] = [];

  //    newList.forEach((item: any) => {
  //      console.log(item)
  //      if (!subClusters.hasOwnProperty(item.subCluster)) {
  //        subClusters[item.subCluster] = [];
  //      }
  //      subClusters[item.subCluster].push(item.data);
  //    });

  //    for (let subClusterName in subClusters) {
  //      let filteredList = subClusters[subClusterName].map((item: any) => {
  //        return {
  //          Id: item.id,
  //          Category: item.category,
  //          Sub_Category: item.subCategory,
  //          Edm_Field_Name: item.edmFieldName,
  //          Edm_Field_Component: item.edmFieldComponent,
  //          //Edm_Field_Export_Name: item.edmFieldExportName,
  //          //Edm_Field_Definition: item.edmFieldDefinition,
  //          Edm_Field_Mandatory: item.edmFieldMandatory,
  //          //Edm_Field_Normalization: this.getNormalizationRule(item.edmFieldNormalizationLength, item.id, 'edm_field_normalization'),
  //          //Is_Custom: item.isCustom,
  //          Vendor_Name: item.vendorName,
  //          Vendor_Field_Name: item.vendorFieldName,
  //          //Scd_Field_Name: item.scdFieldName,
  //          //Scd_Model_Name: item.scdModelName,
  //          //Scd_Field_Definition: item.scdFieldDefinition,
  //          //Scd_Field_Mandatory: item.scdFieldMandatory,
  //          Cost: item.cost,
  //        };
  //      });
  //      console.log(filteredList)
  //      console.log(subClusters[subClusterName])
  //      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredList);
  //      console.log(ws)
  //      XLSX.utils.book_append_sheet(workbook, ws, `${subClusterName}`);
  //    }

  //    XLSX.writeFile(workbook, exportName + '.xlsx');
  //    if (this.exportModalRef != undefined)
  //      this.exportModalRef.hide();
  //  }, 1000);

  //  //setTimeout(() => {
  //  //const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredList);
  //  //const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  //  //XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
  //  //XLSX.writeFile(workbook, exportName + '.xlsx');
  //  //  this.exportModalRef.hide();
  //  //}, 1000);
  //}

  openNormalizationRuleModal(template: TemplateRef<any>, fieldLength: number, standardFieldId: string, columnName: any, headerName: any) {
    this.rule = [];
    this.headerName = headerName;
    this.getNormalizationRule(fieldLength, standardFieldId, columnName);

    this.modalRefNormalization = this.modalService.show(template, { class: 'gray modal-lg', backdrop: 'static' });
  }

  getLinesToCopy(): string {
    return this.rule;
  }

  data: any[] = [];

  async GetFilterData(sqlQuery: string, isAdded: boolean): Promise<any> {
    try {
      const response = await this.filterapiService.getData(sqlQuery).toPromise();

      this.data = response;
      console.log(this.data)

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

  openHierarchyModal() {
    this.showBox = true;
  }
  hideAssetsBox($event: any) {
    this.showBox = false;
  }

  exportAllModel(template: TemplateRef<any>, selectionData: any) {
    this.isSelectedExported = false;
    if (selectionData == 'selected')
      this.isSelectedExported = true;
    this.exportModalRef = this.modalService.show(template, { class: 'gray modal-md', backdrop: 'static' });
  }


  decline() {
    this.exportModalRef.hide();
  }

  //exportSegregatedData() {
  //  let exportName = "Export_All_Data";

  //  let newList: any[] = [];
  //  let prevEName = "";
  //  let prevXName = "";

  //  this.testList.forEach((e: any) => {
  //    e.subClusterDataList.forEach((x: any) => {
  //      x.gridDataList.forEach((y: any) => {
  //        const currentEName = e.name;
  //        const currentXName = x.name;
  //        const row = {
  //          E_Name: currentEName !== prevEName ? currentEName : "",
  //          X_Name: currentXName !== prevXName ? currentXName : "",
  //          ...y
  //        };
  //        newList.push(row);

  //        prevEName = currentEName;
  //        prevXName = currentXName;
  //      });
  //    });
  //  });

  //  let filteredList = newList.map((item: any) => ({
  //    Cluster: item.E_Name,
  //    Sub_Cluster: item.X_Name,
  //    Id: item.id,
  //    Category: item.category,
  //    Sub_Category: item.subCategory,
  //    Edm_Field_Name: item.edmFieldName,
  //    Edm_Field_Component: item.edmFieldComponent,
  //    Edm_Field_Export_Name: item.edmFieldExportName,
  //    Edm_Field_Definition: item.edmFieldDefinition,
  //    Edm_Field_Mandatory: item.edmFieldMandatory,
  //    // Edm_Field_Normalization: this.getNormalizationRule(item.edmFieldNormalizationLength, item.id, 'edm_field_normalization'),
  //    Is_Custom: item.isCustom,
  //    Vendor_Name: item.vendorName,
  //    Vendor_Field_Name: item.vendorFieldName,
  //    Scd_Field_Name: item.scdFieldName,
  //    Scd_Model_Name: item.scdModelName,
  //    Scd_Field_Definition: item.scdFieldDefinition,
  //    Scd_Field_Mandatory: item.scdFieldMandatory,
  //    Cost: item.cost,
  //  }));

    
  //  setTimeout(() => {
  //    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredList);
  //    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  //    XLSX.utils.book_append_sheet(workbook, ws, 'All_Data');
  //    XLSX.writeFile(workbook, exportName + '.xlsx');
  //    //this.exportModalRef.hide();
  //  }, 1000);
  //}

}
