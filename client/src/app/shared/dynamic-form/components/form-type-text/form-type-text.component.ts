import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ControlConfig, GridColumn, PageActionEvent, Table } from 'src/app/models/renderer';
import { RendererService } from 'src/app/services/renderer.service';
import { Field } from '../../models/field.interface';

@Component({
  selector: 'app-form-type-text',
  templateUrl: './form-type-text.component.html',
  styleUrls: ['./form-type-text.component.less']
})
export class FormTypeTextComponent implements Field, OnInit {

  config!: ControlConfig;
  group!: FormGroup;
  parentId!: string;
  //Table within form
  table: Table;
  listOfColumn: GridColumn[] = [];
  gridData: any[] = [];
  gridDataSource: string = '';
  errors: any;
  postApi = '';
  postSchema: any = undefined;
  constructor(
    private rendererService: RendererService,
  ) { }

  ngOnInit(): void {
    if (this.config.type == 'table' && this.config.table && this.config.table.tableColumns.length > 0) {
      this.table = this.config.table;
      this.listOfColumn = this.config.table.tableColumns;
      this.gridDataSource = this.config.table.dataSource;
      if (this.listOfColumn && this.listOfColumn.length > 0 && this.gridDataSource && this.gridDataSource.length > 0) {
        this.bindGrid();
      }
    }
    if (this.config.type == 'editable_table' && this.config.table && this.config.table.tableColumns.length > 0) {
      this.table = this.config.table;
      this.listOfColumn = this.config.table.tableColumns;
      this.gridDataSource = this.config.table.dataSource;
      if (this.listOfColumn && this.listOfColumn.length > 0 && this.gridDataSource && this.gridDataSource.length > 0) {
        this.bindGrid();
      }
    }
    if (this.config.type == 'matCards' || this.config.type == 'schedularCalender') {
      this.gridDataSource = this.config.options.dataSource;
      if (this.gridDataSource && this.gridDataSource.length > 0) {
        this.bindGrid();
      }
    }
    // if(this.config.type=='echeckboxList'){
    //   this.table = this.config.table;
    //   this.listOfColumn = this.config.table.tableColumns;
    //   this.gridDataSource = this.config.table.dataSource;
    //   if (this.listOfColumn && this.listOfColumn.length > 0 && this.gridDataSource && this.gridDataSource.length > 0) {
    //     this.bindGrid();
    //   }
    // }
  }

  bindGrid() {
    this.errors = null;
    let url = this.gridDataSource;
    let selector = this.gridDataSource.substring(this.gridDataSource.indexOf("[") + 1, this.gridDataSource.lastIndexOf("]"));
    if (selector && selector.length > 0 && selector == '_id') {
      url = url.replace('[' + selector + ']', this.parentId);
    }
    if (selector && selector.length > 0 && selector == 'parentId') {
      url = url.replace('[' + selector + ']', this.parentId);
    }
    this.rendererService.getData(url).subscribe(data => {
      this.gridData = data.data;
    }, err => {
      this.errors = err.error.msg;
    });
  }

  onFileChange(file) {
    this.config.value = file;
    //this.group.patchValue(file-upload,file);
    this.group.get(this.config.fieldId).patchValue(file);
  }
  onUploadFile(imageUrl) {
    this.config.value = imageUrl;
    this.group.get(this.config.fieldId).patchValue(imageUrl);
  }

  tableActionClick(event) {
    if (event.actionType == 'select') {
      this.group.get(this.config.fieldId).patchValue(event.data);
    }
  }

  onControlChange() {
    if (this.config.event) {
      const events = this.config.event.filter(x => x.type == 'change');
      events.forEach(element => {
        if (element.type == 'expression') {
          if (element.expression && element.expression.length > 0 && element.expression.split('=').length == 2) {
            const left = element.expression.split('=')[0];
            const right = element.expression.split('=')[1];
          }
          const regex = /\[([^\]]+?)\]/g;
          const fieldIds = [];
          let match;
          while ((match = regex.exec(element.expression)) !== null) {
            fieldIds.push({ fieldId: match[1], value: null });
          }

          fieldIds.forEach(element => {
            element.value = this.group.get(element.fieldId).value;
          });
        }

      });
    }
  }

  onCheckChange($event, fieldId) {
    this.group.get(fieldId).patchValue($event);
  }
  buttonActionClick(action: PageActionEvent, event: Event) {
    if (action?.onevent == 'postformdata') {
      this.postApi = action.api;
      this.postSchema = action.postSchema;
      this.rendererService.clickSubject(event);
    }

  }
  onTableValueChange($event, fieldId) {
    this.group.get(fieldId).patchValue($event);
  }

  onCheckedrow($event, fieldId) {
    this.group.get(fieldId).patchValue($event);
  }
}
