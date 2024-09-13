import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { faArrowCircleDown, faArrowCircleRight, faCircle, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { treeDataModel } from '../../../Models/tree-data.model';

@Component({
  selector: 'app-nested-tree-heirarchy',
  templateUrl: './nested-tree-heirarchy.component.html',
  styleUrl: './nested-tree-heirarchy.component.css'
})
export class NestedTreeHeirarchyComponent implements OnInit, OnChanges {

  exportIcon = faListCheck;
  circleIcon = faCircle;
  arrowDownIcon = faArrowCircleDown;
  arrowRightIcon = faArrowCircleRight;
  @Output() onShowAssetsOutput = new EventEmitter<any>();
  @Output() onExport = new EventEmitter<any>();
  @Input() color: ThemePalette
  @Input() modelData: any[] = [];
  @Input() newDataList: any[] = [];
  @Input() clusterAccordion: any[] = [];
  @Input() showBox: boolean = false;
  previousTreeData: any[] = [];
  isDefaultExpanded: boolean = false;
  treeControl = new NestedTreeControl<treeDataModel>((node) => node.sub_data);
  dataSource = new MatTreeNestedDataSource<treeDataModel>();
  expandedNodes: { [key: string]: boolean } = {};
  exportModalRef: BsModalRef | any;
  isSelectedExported: boolean = false;

  constructor(private modalService: BsModalService) {
  }

  hasChild = (_: number, node: treeDataModel) =>
    !!node.sub_data && node.sub_data.length > 0;

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['newDataList']);

    if ((changes['newDataList'] != undefined && changes['newDataList'].currentValue) || changes['clusterAccordion'].currentValue) {
      if (this.previousTreeData.length > 0 && this.previousTreeData != this.newDataList) {
        this.isDefaultExpanded = true;
      }
      this.getTreeData();
    }
  }


  closeBox() {
    /* this.showBox = false;*/
    this.onShowAssetsOutput.emit(this.showBox);
  }
  public selectNode(node: any, value: boolean): void {
    this.check(node, value)
  }

  check(node: any, value: boolean) {
    node.check = value;
    node.sub_data.forEach((x: any) => {
      this.check(x, value)
    })
  }


  getTreeData() {
    console.log(this.dataSource.data)
    this.previousTreeData = this.newDataList;
    let clusterArray: any[] = [];

    this.modelData.forEach((a: any) => {
      // let isChecked: boolean = false;
      let subClusterArray: any[] = [];
      a.subClusterDataList.forEach((b: any) => {
        let idArray: any[] = [];
        b.gridDataList.forEach((c: any) => {
          if (this.newDataList.includes(c.id)) {
            var previousData = idArray.find(g => g.edmFieldComponent == c.edmFieldComponent && g.edmFieldName == c.edmFieldName);
            let previousIndex = idArray.findIndex(g => g.edmFieldComponent == c.edmFieldComponent && g.edmFieldName == c.edmFieldName);

            if (previousIndex !== -1) {
              let index = previousData.parent_node.lastIndexOf(")");
              if (index !== -1) {
                let updatedData = previousData.parent_node.slice(0, index) + ", " + c.vendorFieldName + previousData.parent_node.slice(index);
                console.log(updatedData);
                idArray[previousIndex].parent_node = updatedData;
              }
            }
            else {
              let idModel = {
                parent_node: c.edmFieldComponent + "." + c.edmFieldName + " (" + c.vendorFieldName + ")",
                edmFieldComponent: c.edmFieldComponent,
                edmFieldName: c.edmFieldName,
                check: true,
                level: 3
              };
              idArray.push(idModel);
            }
          }
        });
        // isChecked = idArray.some(x => x.check == true);
        let subClusterModel = {
          parent_node: b.name,
          check: true,
          sub_data: idArray,
          level: 2
        }
        if (this.newDataList.length > 0 || this.clusterAccordion.includes(a.name))
          subClusterArray.push(subClusterModel);
      });
      let clusterModel = {
        parent_node: a.name,
        check: true,
        sub_data: subClusterArray,
        level: 1
      }
      clusterArray.push(clusterModel);
    });

    console.log(clusterArray)
    this.dataSource.data = clusterArray;
  }

  exportAllModel(template: TemplateRef<any>, selectionData: any) {
    this.isSelectedExported = true;
    this.exportModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static' });
  }

  exportData() {
    this.onExport.emit(this.isSelectedExported);
  }

  decline() {
    this.exportModalRef.hide();
  }

}
