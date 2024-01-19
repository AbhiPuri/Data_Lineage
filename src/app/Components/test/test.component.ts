////import { Component, OnInit, TemplateRef } from '@angular/core';
////import { FormBuilder } from '@angular/forms';
////import { faColumns, faMinus, faPlus, faSearch, faSort } from '@fortawesome/free-solid-svg-icons';
////import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
////import * as XLSX from 'xlsx';
////import { DataModel } from '../../Models/data.model';
////@Component({
////  selector: 'app-test',
////  templateUrl: './test.component.html',
////  styleUrls: ['./test.component.css']
////})
////export class TestComponent implements OnInit {

////  sortIcon = faSort;
////  searchIcon = faSearch;
////  columnChooserIcon = faColumns;
////  plusIcon = faPlus;
////  minusIcon = faMinus;
////  filterSearchText: any;
////  categoryList: any[] = [];
////  selectedCategoryItems: any[] = [];
////  assetClassList: any[] = [];
////  selectedAssetClassItems: any[] = [];
////  dropdownSettings = {};
////  dropdownSettings1 = {};
////  mainAccordion: any[] = [];
////  subAccordion: any[] = [];
////  mainAccIndex: any = null;
////  subAcc: any[][] = [[]];
////  testList: any[] = [];
////  dataModel: DataModel[] = [{
////    assetClassName: "abc",
////    edmFieldName: "abc",
////    edmFieldExName: "abc",
////    edmFieldDefinition: "abc",
////    efMandatory: "abc",
////    normalization: "abc",
////    derivation: "abc",
////    chatGptOutput: "abc",
////    isCustom: "abc",
////    vendorName: "abc",
////    vendorFieldName: "abc",
////  }];

////  newDataList: any[] = [];
////  previousCategoryList: any[] = [];
////  previousAssetClassList: any[] = [];
////  sortProperty: string = 'id';
////  sortOrder = 1;
////  defaultViewColumns = [
////    { columnName: "Id", isRequired: true, showColumn: true },
////    { columnName: "Category", isRequired: true, showColumn: true},
////    { columnName: "GainFieldName", isRequired: true, showColumn: true},
////    { columnName: "BbbgMnemonicName", isRequired: true, showColumn: true },
////    { columnName: "ScdModelFieldName", isRequired: false, showColumn: false },
////    { columnName: "AssetClass", isRequired: false, showColumn: false },
////  ];
////  modalRef: BsModalRef | any;
////  selecttabbox: any = 1;



////  constructor(
////    private modalService: BsModalService,
////  ) {

////  }

////  getData() {
////    this.testList = [
////      {
////        id: 1,
////        name: 'Instrument',
////        subTestList: [
////          {
////            id: 1,
////            name: 'Equity',
////            subTestDataList: [
////              {
////                id: 8,
////                category: ['Identifiers'],
////                gainFieldName: 'Security ID',
////                bbgMnemonicName: 'TICKER_AND_EXCH_CODE',
////                scdModelFieldName: 'Security ID',
////                assetClass: 'Equity'
////              },
////              {
////                id: 9,
////                category: ['Static'],
////                gainFieldName: 'Currency',
////                bbgMnemonicName: 'CRNCY',
////                scdModelFieldName: 'Currency',
////                assetClass: 'Equity'
////              },
////            ]

////          },
////          {
////            id: 2,
////            name: 'Bond',
////            subTestDataList: [
////              {
////                id: 10,
////                category: ['Identifiers'],
////                gainFieldName: 'Issuer',
////                bbgMnemonicName: 'ID_BB_COMPANY',
////                scdModelFieldName: 'Issuer',
////                assetClass: 'Equities'
////              },
////              {
////                id: 11,
////                category: ['test2'],
////                gainFieldName: 'Currency',
////                bbgMnemonicName: 'CRNCY',
////                scdModelFieldName: 'Currency',
////                assetClass: 'Bond'
////              },
////            ]
////          },
////        ]
////      },
////      {
////        id: 2,
////        name: 'Services',
////        subTestList: [
////          {
////            id: 1,
////            name: 'IAS',
////            subTestDataList: [
////              {
////                id: 1,
////                category: ['Identifiers', 'Static'],
////                gainFieldName: 'Security ID',
////                bbgMnemonicName: 'TICKER_AND_EXCH_CODE',
////                scdModelFieldName: 'Security ID',
////                assetClass: 'Equity'
////              },
////              {
////                id: 2,
////                category: ['Static', 'test'],
////                gainFieldName: 'Currency',
////                bbgMnemonicName: 'CRNCY',
////                scdModelFieldName: 'Currency',
////                assetClass: 'Bond'
////              },
////              //{
////              //  id: 1,
////              //  category: ['Identifiers', 'Static'],
////              //  gainFieldName: 'Security ID',
////              //  bbgMnemonicName: 'TICKER_AND_EXCH_CODE',
////              //  scdModelFieldName: 'Security ID',
////              //  assetClass: 'Equity'
////              //},
////              //{
////              //  id: 2,
////              //  category: ['Static', 'test'],
////              //  gainFieldName: 'Currency',
////              //  bbgMnemonicName: 'CRNCY',
////              //  scdModelFieldName: 'Currency',
////              //  assetClass: 'Bond'
////              //},
////              //{
////              //  id: 3,
////              //  category: ['test'],
////              //  gainFieldName: 'Currency',
////              //  bbgMnemonicName: 'CRNCY',
////              //  scdModelFieldName: 'Currency',
////              //  assetClass: 'Bond'
////              //},
////              //{
////              //  id: 4,
////              //  category: ['Identifiers'],
////              //  gainFieldName: 'Currency',
////              //  bbgMnemonicName: 'CRNCY',
////              //  scdModelFieldName: 'Currency',
////              //  assetClass: 'Bond'
////              //},
////            ]
////          },
////          {
////            id: 2,
////            name: 'IOS',
////            subTestDataList: [
////              {
////                id: 5,
////                category: ['Identifiers', 'test'],
////                gainFieldName: 'Security ID',
////                bbgMnemonicName: 'TICKER_AND_EXCH_CODE',
////                scdModelFieldName: 'Security ID',
////                assetClass: 'Equity'
////              },
////              {
////                id: 6,
////                category: ['Identifiers'],
////                gainFieldName: 'Currency',
////                bbgMnemonicName: 'CRNCY',
////                scdModelFieldName: 'Currency',
////                assetClass: 'Bond'
////              },
////              {
////                id: 7,
////                category: ['test1', 'Identifiers'],
////                gainFieldName: 'Currency',
////                bbgMnemonicName: 'CRNCY',
////                scdModelFieldName: 'Currency',
////                assetClass: 'Bond'
////              },
////              {
////                id: 8,
////                category: ['test1', 'Static'],
////                gainFieldName: 'Currency',
////                bbgMnemonicName: 'CRNCY',
////                scdModelFieldName: 'Currency',
////                assetClass: 'Equity'
////              },
////            ]
////          },
////        ]
////      },
////    ];
////  }
////  ngOnInit() {
////    this.getData();
////    this.getCategoryList();
////    this.getAssetClassList();
////    this.dropdownSettings = {
////      singleSelection: false,
////      idField: 'id',
////      textField: 'name',
////      selectAllText: 'Select All',
////      unSelectAllText: 'UnSelect All',
////      itemsShowLimit: 3,
////      allowSearchFilter: true
////    };

////  }

////  getCategoryList() {
////    this.testList.forEach((e: any) => {
////      e.subTestList.forEach((x: any) => {
////        if (x.subTestDataList != undefined) {
////          x.subTestDataList.forEach((y: any) => {
////            y.category.forEach((c: any) => {
////              if (!this.categoryList.includes(c))
////                this.categoryList.push(c);
////            });
////          });
////        }
////      });
////    });
////  }

////  getAssetClassList() {
////    this.testList.forEach((e: any) => {
////      e.subTestList.forEach((x: any) => {
////        if (x.subTestDataList != undefined) {
////          x.subTestDataList.forEach((y: any) => {
////            if (!this.assetClassList.includes(y.assetClass))
////              this.assetClassList.push(y.assetClass);
////          });
////        }
////      });
////    });
////  }


////  //accordionMain(item: any) {
////  //  console.log(this.mainAccordion)
////  //  console.log(this.subAccordion)
////  // // console.log(item);

////  //  if (this.mainAccordion.includes(item)) {
////  //    this.mainAccordion = this.mainAccordion.filter(i => i !== item);
////  //  } else {
////  //    this.mainAccordion.push(item);
////  //  }
////  //}

////  //accordionSub(mainAcc: any, item: any) {
////  //  console.log(this.mainAccordion)
////  //  console.log(this.subAccordion)
////  //  this.mainAccIndex = mainAcc;

////  //  if (!this.subAccordion.includes(item)) {
////  //    this.subAccordion.push(item);
////  //  }
////  //  else if (this.subAccordion.includes(item) && this.activeAccordion.includes(mainAcc + 1)) {
////  //    this.subAccordion = this.subAccordion.filter((i: any) => i !== item);
////  //  }
////  //  if (!this.activeAccordion.includes(mainAcc + 1)) {
////  //    this.activeAccordion.push(mainAcc + 1);
////  //  }
////  //}


////  accordionMain(item: any) {
////    if (this.mainAccordion.includes(item)) {
////      this.mainAccordion = this.mainAccordion.filter(i => i !== item);
////    } else {
////      this.mainAccordion = [];
////      this.subAccordion = [];
////      this.mainAccordion.push(item);
////    }
////  }

////  accordionSub(mainAcc: any, item: any) {
////    console.log(this.mainAccordion)
////    console.log(this.subAccordion)
////    this.mainAccIndex = mainAcc;

////    if (!this.subAccordion.includes(item)) {
////      this.subAccordion = [];
////      this.subAccordion.push(item);
////    }
////    else if (this.subAccordion.includes(item) && this.mainAccordion.includes(mainAcc + 1)) {
////      this.subAccordion = this.subAccordion.filter((i: any) => i !== item);
////    }
////    if (!this.mainAccordion.includes(mainAcc + 1)) {
////      this.mainAccordion.push(mainAcc + 1);
////    }
////  }

////  search() {
////    console.log(this.filterSearchText)
////    this.filterSearchText = this.filterSearchText.toLowerCase();
     
////    this.getData();
////    let newCategoryList = this.testList;
////    this.testList = [];
////    newCategoryList.forEach((e: any) => {
////      let subHeaderArr: any[] = [];
////      let test: any[] = [];
////      let subModel = {
////        id: null,
////        name: null,
////        subTestDataList: test
////      };
////      e.subTestList.forEach((x: any) => {
////        let dataArr: any[] = [];
////        if (x.subTestDataList != undefined) {
////          x.subTestDataList.forEach((y: any) => {
////            let lowerCasedCategory = y.category.map((x: any) => x.toLowerCase());
////            if (y.id.toString().includes(this.filterSearchText) || y.gainFieldName.toLowerCase().includes(this.filterSearchText) || y.bbgMnemonicName.toLowerCase().includes(this.filterSearchText)
////              || y.scdModelFieldName.toLowerCase().includes(this.filterSearchText) || y.assetClass.toLowerCase().includes(this.filterSearchText) || lowerCasedCategory.includes(this.filterSearchText))
////              dataArr.push(y);
////          });
////        }
////        if (dataArr.length > 0) {
////          subModel = {
////            id: x.id,
////            name: x.name,
////            subTestDataList: dataArr
////          };
////          if (dataArr.length > 0)
////            subHeaderArr.push(subModel);
////        }
////      });
////      let model = {
////        id: e.id,
////        name: e.name,
////        subTestList: subHeaderArr
////      }
////      if (subHeaderArr.length > 0)
////        this.testList.push(model);
////    });
////  }

////  onItemChange(item: any, isSelectedAll: boolean) {
////    console.log(item);
////    console.log(this.selectedCategoryItems);
////    this.getData();
////    this.previousCategoryList = [];
////    let newCategoryList = this.previousAssetClassList.length > 0 ? this.previousAssetClassList : this.testList;
////    if (this.selectedCategoryItems.length > 0) {
////      this.testList = [];
////      newCategoryList.forEach((e: any) => {
////        // let headerArr = [];
////        let subHeaderArr: any[] = [];
////        let test: any[] = [];
////        let subModel = {
////          id: null,
////          name: null,
////          subTestDataList: test
////        };
////        e.subTestList.forEach((x: any) => {
////          let dataArr: any[] = [];
////          if (x.subTestDataList != undefined) {
////            x.subTestDataList.forEach((y: any) => {
////             // console.log(y.category)
////              if ((y.category.some((r: any) => this.selectedCategoryItems.includes(r)) && isSelectedAll == false) || (y.category.some((r: any) => item.includes(r)) && isSelectedAll == true))
////                dataArr.push(y);
////            });
////          }
////          if (dataArr.length > 0) {
////            subModel = {
////              id: x.id,
////              name: x.name,
////              subTestDataList: dataArr
////            };
////            if (dataArr.length > 0)
////              subHeaderArr.push(subModel)
////           // console.log(subModel)
////          }
////        });
////        let model = {
////          id: e.id,
////          name: e.name,
////          subTestList: subHeaderArr
////        }
////        if (subHeaderArr.length > 0)
////          this.testList.push(model);
////      });
////      this.previousCategoryList = this.testList;
////     // console.log(this.testList)
////    }
////  }

////  onAssetClassChange(item: any, isSelectedAll: boolean) {
////    console.log(this.selectedCategoryItems);
////    if (this.selectedCategoryItems.length <= 0)
////      this.getData();
////    this.previousAssetClassList = [];
////    let newAssetClassList = this.previousCategoryList.length > 0 ? this.previousCategoryList : this.testList;

////    if (this.selectedAssetClassItems.length > 0) {
////      this.testList = [];

////      newAssetClassList.forEach((e: any) => {
////        // let headerArr = [];
////        let subHeaderArr: any[] = [];
////        let test: any[] = [];
////        let subModel = {
////          id: null,
////          name: null,
////          subTestDataList: test
////        };
////        e.subTestList.forEach((x: any) => {
////          let dataArr: any[] = [];
////          if (x.subTestDataList != undefined) {
////            x.subTestDataList.forEach((y: any) => {
////              console.log(y.assetClass)
////              if ((this.selectedAssetClassItems.includes(y.assetClass) && isSelectedAll == false) || (item.includes(y.assetClass) && isSelectedAll == true))
////                dataArr.push(y);
////            });
////          }
////          if (dataArr.length > 0) {
////            subModel = {
////              id: x.id,
////              name: x.name,
////              subTestDataList: dataArr
////            };
////            if (dataArr.length > 0)
////              subHeaderArr.push(subModel)
////            console.log(subModel)
////          }
////        });
////        let model = {
////          id: e.id,
////          name: e.name,
////          subTestList: subHeaderArr
////        }
////        if (subHeaderArr.length > 0)
////          this.testList.push(model);
////      });
////      this.previousAssetClassList = this.testList;
////    }
////    else if (this.previousCategoryList.length > 0) {
////      this.testList = this.previousCategoryList;
////    }
////    else {
////      this.getData();
////    }

////    console.log(this.testList)
////  }

////  sort(property: string, subIndex: any) {
////    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
////    this.sortProperty = property;
////   // console.log(this.testList.filter((x: any) => x.id == headerId && x.subTestList.some((y: any) => y.id == subHeaderId)));
////    this.testList.filter((x: any) => {
////      console.log(x.subTestList[subIndex].subTestDataList);
////      [...x.subTestList[subIndex].subTestDataList.sort((a: any, b: any) => {
////        let result = 0;
////        if (a[property] < b[property]) {
////          result = -1;
////        }
////        if (a[property] > b[property]) {
////          result = 1;
////        }
////        console.log(result * this.sortOrder)
////        return result * this.sortOrder;
////      })];
     
////    });


////  }


////  openModal(template: TemplateRef<any>) {
   
////    this.modalRef = this.modalService.show(template, { backdrop: 'static'});
////  }

////  showHideColumn(item: any) {
////    console.log(item)
////    if (item.showColumn) {
////      let selectedColumn = this.defaultViewColumns.find(x => x.columnName === item.columnName);
////      console.log(selectedColumn)
////      /*this.selectFilterList.push(selectedColumn);*/
////    }
////    else {
////     // this.selectFilterList = this.defaultViewColumns.filter(x => x.columnName !== item.columnName);
////    }

////  }

////  addData(item: any)
////  {
////    this.newDataList.push(item.id);
////  }

////  removeData(item: any) {
////   // console.log(this.newDataList)
////    const removeIndex = this.newDataList.findIndex(x => x === item.id);
////    if (removeIndex !== -1) {
////      this.newDataList.splice(removeIndex, 1);
////    }
////   // console.log(this.newDataList)
////  }


////  exportData() {
////    //import("xlsx").then(xlsx => {
////    //  const worksheet = xlsx.utils.json_to_sheet(this.testList);
////    //  const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
////    //  const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
////    //  this.saveAsExcelFile(excelBuffer, "sales");

////    //});
////    let newList: any[] = [];
////    if (this.testList.length > 0) {
////      this.testList.forEach((e: any) => {
////        e.subTestList.forEach((x: any) => {
////          if (x.subTestDataList != undefined) {
////            x.subTestDataList.forEach((y: any) => {
////              console.log(y)
////              newList.push(y);
////            });
////          }
////        });
////      });
////    }

////    console.log(newList)

////    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newList);
////    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

////    // save to file
////    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
////    XLSX.writeFile(workbook, 'test' + '.xls');

////  }


////  //saveAsExcelFile(buffer: any, fileName: string): void {
////  //  import("file-saver").then(FileSaver => {
////  //    let EXCEL_TYPE =
////  //      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

////  //    let EXCEL_EXTENSION = ".xlsx";
////  //    const data: Blob = new Blob([buffer], {
////  //      type: EXCEL_TYPE
////  //    });

////  //    FileSaver.saveAs(
////  //      data,
////  //      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
////  //    );
////  //  });

////  //}

////}
