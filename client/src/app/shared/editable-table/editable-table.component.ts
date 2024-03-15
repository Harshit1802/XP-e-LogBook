import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ControlConfig, GridColumn, PageAction, Table } from 'src/app/models/renderer';
import { RendererService } from 'src/app/services/renderer.service';
import { Field } from '../dynamic-form/models/field.interface';

const Data_Source = { createdAt: "", episodeId: "", isActive: false, isDeleted: false, isStaffOnLeave: false, notes: "", staffAssigned: "", taskEffectiveDate: "", taskStatus: "", taskTypeId: "", timestamp: "", updatedAt: "", userTypeId: "", visitCount: null, visitPerDay: null, visitPerWeek: null, weekCount: null, id: 1 }

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.less']
})
export class EditableTableComponent implements Field, OnInit {
  @Input() table: Table;
  @Output() actionClick = new EventEmitter<any>();
  config!: ControlConfig;
  group!: FormGroup;
  parentId!: string;

  displayedColumns: string[] = [];
  // listOfColumn: string[] = [];
  // @Input() gridData: any[] = [];
  // @Input() selectionType: string = '';
  // @Output() pageSizeChanged = new EventEmitter<any>();
  // @Output() actionClick = new EventEmitter<any>();
  @Output() onValueChange = new EventEmitter<any>();
  @Input() pagination = {
    page: 1,
    size: 50,
    total: 0
  };
  //newRowTable:GridColumn[]=[];
  //selectedRole: string = 'Hiq Admin';
  //selectedUserType: string = 'Agency Admin';
  //roles: string[] = ['Hiq Admin', 'Agency Admin', 'Clinician'];
  //userTypes: string[] = ['Agency Admin', 'Clinician', 'Hiq Admin'];
  pages = [10, 25, 50, 100]
  checkAll: boolean = false;
  isindeterminate: boolean = false;
  //selectedRows: any[] = [];
  //isDeleteButtonEnabled = false;
  //sortTable: any;

  gridData: any[] = [];
  @ViewChild('educationTable') grid: MatTable<any>;
  constructor(public renderService: RendererService) { }
  ngOnInit(): void {
    // if (this.config && (this.config.type == 'editable_table' || this.config.type == 'table' ) && this.table && this.table.tableColumns.length > 0) {
    //   this.displayedColumns = this.table.tableColumns.map(x => x.key);
    //   this.bindGrid();

    // }
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.table.tableColumns.length > 0) {
      this.displayedColumns = this.table.tableColumns.map(x => x.key);
      this.bindGrid();
    }

    if (this.gridData && this.gridData.length > 0) {
      this.gridData = JSON.parse(JSON.stringify(this.gridData));
      this.processGridData();
    } else {
      let newdata = { createdAt: "", episodeId: "", isActive: false, isDeleted: false, isStaffOnLeave: false, notes: "", staffAssigned: "", taskEffectiveDate: "", taskStatus: "", taskTypeId: "", timestamp: "", updatedAt: "", userTypeId: "", visitCount: null, visitPerDay: null, visitPerWeek: null, weekCount: null, id: 1 }
      this.gridData.push(newdata);
      //this.table.renderRows();
    }

  }

  bindGrid() {
    let url = this.table.dataSource;
    let selector = this.table.dataSource.substring(this.table.dataSource.indexOf("[") + 1, this.table.dataSource.lastIndexOf("]"));
    if (selector && selector.length > 0 && selector == '_id') {
      url = url.replace('[' + selector + ']', this.parentId);
    }
    if (selector && selector.length > 0 && selector == 'parentId') {
      url = url.replace('[' + selector + ']', this.parentId);
    }
    this.renderService.getData(url).subscribe(data => {
      this.gridData = data.data;
      console.log('gridDaata', this.gridData);
      console.log('tableColumns', this.table.tableColumns);
    }, err => {
      //this.errors = err.error.msg;
    });
  }


  sizeChange() {
    // this.pagination.page = 1;
    // this.pageSizeChanged.emit(this.pagination);
  }
  pageChange(page: number) {
    this.pagination.page = page;
    //this.pageSizeChanged.emit(this.pagination);
  }
  actionItemClick(actionType: PageAction, data: any) {
    this.actionClick.emit({ actionType: actionType, data: data })

  }
  processGridData() {
    const actionColumn = this.table.tableColumns.find(x => x.key == 'action' || x.key == 'reply');
    if (actionColumn && actionColumn.actions && actionColumn.actions.length > 0) {
      actionColumn.actions.forEach((element, index) => {
        element.id = index;
      });
      this.gridData.forEach(row => {
        row.actions = JSON.parse(JSON.stringify(actionColumn.actions));
        row.actions.forEach(act => {
          const expression = actionColumn.actions.find(x => x.id == act.id)?.isDisabled;
          act.isDisabled = this.renderService.checkCondition(expression, row);
          console.log(row);
        });

      });
    }
  }

  rowSelectChange(row) {
    if (this.table.selectionType == 'single') {
      this.gridData.forEach(element => {
        element.selected = element._id == row._id ? row.selected : false;
      });
      //this.actionClick.emit({ actionType: 'select', data: row._id })
    } else {
      const checkedRows = this.gridData.filter(x => x.selected == true);
      if (checkedRows.length == this.gridData.length) {
        this.checkAll = true;
        this.isindeterminate = false;
      } else if (checkedRows.length > 0) {
        this.checkAll = false;
        this.isindeterminate = true;
      } else {
        this.checkAll = false;
        this.isindeterminate = false;
      }
      //this.actionClick.emit({ actionType: 'select', data: this.gridData.filter(x => x.selected == true).map(x => x._id) });
    }

  }

  setAllChecked(event) {
    this.gridData.forEach(element => {
      element.selected = event;
    });
    this.rowSelectChange(null);
  }

  toggleSelectAll(checked: boolean) {
    // this.selectedRows = checked ? this.sortTable.data : [];
    // this.isDeleteButtonEnabled = checked;
  }

  toggleRowSelection(checked: boolean, rowData: any) {
    // if (checked) {
    //   this.selectedRows.push(rowData);
    // } else {
    //   this.selectedRows = this.selectedRows.filter(row => row !== rowData);
    // }

    // this.isDeleteButtonEnabled = this.selectedRows.length > 0;
  }

  isDeleteButtonDisabled(rowData: any): boolean {
    // You can implement custom logic based on your requirements
    return false; //!this.isDeleteButtonEnabled || !rowData.selected;
  }

  addRow() {
    let indexValue = this.gridData.length + 1;
    let newData = [];
    this.gridData = [...this.gridData, newData];

  }

  removeRow(id) {
    this.gridData = this.gridData.filter((u) => u.id !== id);
  }

  onCellValueChanged(element) {
    let gridData = [];
    if (element.length > 0) {
      gridData.push(element)
    }
    this.onValueChange.emit(gridData);
  }
}