import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GridColumn, PageAction } from 'src/app/models/renderer';
import { RendererService } from 'src/app/services/renderer.service';


interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() listOfColumn: GridColumn[] = [];
  @Input() gridData: any[] = [];
  @Input() selectionType: string = '';
  @Output() pageSizeChanged = new EventEmitter<any>();
  @Output() actionClick = new EventEmitter<any>();
  @Output() OnCheckedRow =new EventEmitter<any[]>()
  @Input() pagination = {
    page: 1,
    size: 50,
    total: 0
  };
  selectedRole: string = 'Hiq Admin';
  selectedUserType: string = 'Agency Admin';
  roles: string[] = ['Hiq Admin', 'Agency Admin', 'Clinician'];
  userTypes: string[] = ['Agency Admin', 'Clinician', 'Hiq Admin'];
  pages = [10, 25, 50, 100]
  checkAll: boolean = false;
  isindeterminate: boolean = false;
  selectedRows: any[] = [];
  isDeleteButtonEnabled = false;
  sortTable: any;
  constructor(public renderService: RendererService) { }

  ngOnInit(): void {
    console.log(this.listOfColumn);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.gridData && this.gridData.length > 0) {
      this.gridData = JSON.parse(JSON.stringify(this.gridData));
      this.processGridData();
    }
  }
  sizeChange() {
    this.pagination.page = 1;
    this.pageSizeChanged.emit(this.pagination);
  }
  pageChange(page: number) {
    this.pagination.page = page;
    this.pageSizeChanged.emit(this.pagination);
  }
  actionItemClick(actionType: PageAction, data: any) {
    this.actionClick.emit({ actionType: actionType, data: data })

  }
  processGridData() {
    const actionColumn = this.listOfColumn.find(x => x.key == 'action' || x.key == 'reply');
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
    if (this.selectionType == 'single') {
      this.gridData.forEach(element => {
        element.selected = element._id == row._id ? row.selected : false;
      });
      this.actionClick.emit({ actionType: 'select', data: row._id })
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
      this.actionClick.emit({ actionType: 'select', data: this.gridData.filter(x => x.selected == true).map(x => x._id) });
    }

  }

  setAllChecked(event) {
    this.gridData.forEach(element => {
      element.selected = event;
    });
    this.rowSelectChange(null);
  }

  toggleSelectAll(checked: boolean) {
    this.selectedRows = checked ? this.sortTable.data : [];
    this.isDeleteButtonEnabled = checked;
  }

  toggleRowSelection(checked: boolean, rowData: any) {
    if (checked) {
      this.selectedRows.push(rowData);
      this.OnCheckedRow.emit(this.selectedRows)
    } else {
      this.selectedRows = this.selectedRows.filter(row => row !== rowData);
    }

    this.isDeleteButtonEnabled = this.selectedRows.length > 0;
  }

  isDeleteButtonDisabled(rowData: any): boolean {
    // You can implement custom logic based on your requirements
    return !this.isDeleteButtonEnabled || !rowData.selected;
  }
}
