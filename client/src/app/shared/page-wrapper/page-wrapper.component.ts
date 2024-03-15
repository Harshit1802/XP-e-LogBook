
import { Component, Inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { inNextTick } from 'ng-zorro-antd/core/util';
import { Buttons, Button } from 'src/app/models/Constant';
import { PageAction, Page, GridColumn } from 'src/app/models/renderer';
import { RendererService } from 'src/app/services/renderer.service';
import { MessageBox } from '../components/message-box/message-box.provider';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { PopupRendererComponent } from '../popup-renderer/popup-renderer.component';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.less']
})
export class PageWrapperComponent implements OnInit, OnChanges {

  defaultData: any = undefined;
  @Input() page?: Page = undefined;
  @ViewChild('dynamicFormRef') dynamicFormRef: DynamicFormComponent;

  selectedTabIndex: number = 0;
  isDynamicFormRendered = false;
  errors: any;

  postApi = '';
  postSchema: any = undefined;
  parentId: any;
  constructor(
    public dialogRef: MatDialogRef<PopupRendererComponent>,
    public dialog: MatDialog,
    private rendererService: RendererService,
    private mb: MessageBox
  ) {


  }
  ngOnInit(): void {
  }

  setDefaultData(data) {
    this.defaultData = data;
  }
  ngOnChanges(): void {
    this.init();
  }
  init() {
    if (this.page) {
      console.log('page', this.page);
      if (this.page.tabs && this.page.tabs.length > 0) {
        this.tabChange(this.selectedTabIndex);
      } else {
        this.setPageConfig();
      }
    }
  }
  setPageConfig() {
    if (this.page.formConfig && this.page.formConfig.rows.length > 0) {
      this.page.formConfig.rows.push({
        columns: [{
          width: 0,
          controls: [
            {
              id: 'hdnId',
              type: 'hidden',
              fieldId: '_id',
              value: "",
              isVisible: true
            }
          ]
        }]
      })
    }
    if (this.page.pageConfig && this.page.pageConfig.defaultData == 'parent') {
      this.setDefaultValues(this.defaultData);
    }
    else if (this.page.pageConfig && this.page.pageConfig.defaultData == 'api') {
      this.page.pageConfig.api = this.page.pageConfig.api.replace('[parentId]', this.defaultData._id);
      this.rendererService.getData(this.page.pageConfig.api).subscribe(res => {
        this.setDefaultValues(res.data);
      });
    }
    // if (this.page.table && this.page.table && this.page.table.tableColumns.length > 0) {
    //   this.listOfColumn = this.page.table.tableColumns;
    //   this.gridDataSource = this.page.table.dataSource;
    //   if (this.listOfColumn && this.listOfColumn.length > 0 && this.gridDataSource && this.gridDataSource.length > 0) {
    //     this.bindGrid();
    //   }
    // }
    // if (this.page.editable_table && this.page.editable_table.tableColumns.length > 0) {
    //   this.listOfColumn = this.page.editable_table.tableColumns;
    //   this.gridDataSource = this.page.editable_table.dataSource;
    //   if (this.listOfColumn && this.listOfColumn.length > 0 && this.gridDataSource && this.gridDataSource.length > 0) {
    //     this.bindGrid();
    //   }
    // }
  }
  tabChange(tabIndex) {
    this.selectedTabIndex = tabIndex;
    this.rendererService.getPageJson(this.page.tabs[this.selectedTabIndex].content + '.json').subscribe((json) => {
      this.page.formConfig = json.formConfig;
      this.page.pageConfig = json.pageConfig;
      this.setPageConfig();
    });
  }
  setDefaultValues(data) {
    let i = 0;
    this.page.formConfig.rows.forEach(row => {
      row.columns.forEach(col => {
        col.controls.forEach(control => {
          if (control.type == 'multiselect') {
            control.value = data ? data[control.fieldId].map(x => x._id) : [];
          }
          else {
            control.value = data && data[control.fieldId] ? data[control.fieldId] : '';
          }

        });
      });
    });
    this.page.formConfig = JSON.parse(JSON.stringify(this.page.formConfig));
    this.isDynamicFormRendered = true;
    console.log('test Id check', this.page.formConfig);
  }
  
  formSubmit(event) {
    this.errors = null;
    console.log('form-submit', event);
    let formData = event;
    if (this.postSchema) {
      for (const key in this.postSchema) {
        if (this.postSchema[key] == "file") {
          let files = formData[key];
          let arrFiles = [];
          if (files && files.length > 0) {
            files.forEach(file => {
              arrFiles.push({
                base64String: file.base64String,
                lastModifiedDate: file.lastModifiedDate,
                name: file.name,
                size: file.size,
                type: file.type
              });
            });
            this.postSchema[key] = arrFiles;
            // formData[this.postSchema[key].replace('[', '').replace(']', '')] = null;
          }
        }
        else if (key == 'uploadedFiles') {
          let files = formData[this.postSchema[key].replace('[', '').replace(']', '')];
          let arrFiles = [];
          if (files && files.length > 0) {
            files.forEach(file => {
              arrFiles.push({
                base64String: file.base64String,
                lastModifiedDate: file.lastModifiedDate,
                name: file.name,
                size: file.size,
                type: file.type
              });
            });
            formData.uploadedFiles = arrFiles;
            //formData[this.postSchema[key].replace('[', '').replace(']', '')] = null;
          }
        }
        else {
          if (this.postSchema[key].startsWith('[') && this.postSchema[key].indexOf(']') > 0) {
            const value = this.postSchema[key].replace('[', '').replace(']', '') == 'parentId' ? this.parentId : this.postSchema[key].replace('[', '').replace(']', '');
            this.postSchema[key] = value;
          }
          if (formData[key] == undefined) {
            formData[key] = this.postSchema[key];
          }
        }


      }
    }

    this.rendererService.postData(this.postApi, formData).subscribe(x => {
      //this.dialogRef.close('closeandrefreshparent');
      console.log(x);
      this.openMessageBox(Buttons.Ok, 'closeandrefreshparent', 'Success', x.msg);
    },
      (err) => {
        this.errors = err.error.msg;
      });
  }

  // deleteItem(id: string) {
  //   this.rendererService.deleteData(this.deleteApi, id).subscribe(
  //     (response) => {
  //       console.log('Item deleted successfully', response);
  //       this.openMessageBox(Buttons.Ok, 'closeandrefreshparent', 'Success', response.msg);
  //     },
  //     (err) => {
  //       this.errors = err.error.msg;
  //     }
  //   );
  // }

  popupActionClick(action: PageAction, event: Event) {


    if (action.event?.onevent == 'closeandrefreshparent') {
      this.dialogRef.close('closeandrefreshparent');
    }
    else if (action.event?.onevent == 'postformdata') {
      this.postApi = action.event.api;
      this.postSchema = action.event.postSchema;
      this.dynamicFormRef.handleSubmit(event);
      // this.rendererService.clickSubject(event);
    } else if (action.event?.onevent == 'deleteItem') {
      // this.deleteItem(this.parentId);
    }
  }

  openMessageBox(buttons: Buttons, actionOnParent, title: string, message: string) {
    let dialog = this.mb.show(message, title, buttons);

    dialog.dialogResult$.subscribe(result => {
      console.log("Button pressed: ", Button[result]);
      // IF OK
      if (Button[result] == 'Ok') {
        if (actionOnParent == 'closeandrefreshparent') {
          this.dialogRef.close('closeandrefreshparent');
        }
        else if (actionOnParent == 'nexttab') {
          this.selectedTabIndex = this.selectedTabIndex + 1;
          this.tabChange(this.selectedTabIndex);
        }
        else if (actionOnParent == 'close') {
          this.dialogRef.close();
        }
      }
    });

  }
  openPopup(action: PageAction, defaultData: any) {
    const dialogRef = this.dialog.open(PopupRendererComponent, {
      width: action.event.popupwidth ? action.event.popupwidth : '40%',
      data: {
        pageAction: action,
        defaultData: defaultData ? defaultData : null,
        id: defaultData ? defaultData._id : ''
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.init();
    });
  }

  tableActionClick(event: any) {
    const action = event.actionType as PageAction;
    const rowData = event.data;
    let url = '';
    if (action.event && action.event.api) {
      url = action.event.api;
      let selector = action.event.api.substring(action.event.api.indexOf("[") + 1, action.event.api.lastIndexOf("]"));
      if (selector && selector.length > 0) {
        url = url.replace('[' + selector + ']', rowData[selector]);
      }
    }


    if (action.event?.onevent == 'api-get') {
      //call get api
      this.rendererService.getData(url).subscribe(data => {
        console.log(data);
      });
    }
    if (action.event?.onevent == 'popup') {
      this.openPopup(action, rowData);
    }
    if (action.event?.onevent == 'download') {
      this.rendererService.getData(url).subscribe(res => {
        this.downlaodData(res.data);
      });
    }
  }

  downlaodData(fileData: any) {
    const base64 = fileData.base64String;
    let fileName = fileData.name;//Math.random().toString() + '.' + fileData.name.split('.')[1];
    //const src = `data:text/csv;base64,${base64}`;
    const link = document.createElement("a")
    link.href = fileData.base64String
    link.download = fileName
    link.click()
    link.remove()

  }

}