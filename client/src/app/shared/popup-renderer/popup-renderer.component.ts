import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ControlConfig } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Button, Buttons } from 'src/app/models/Constant';
import { GridColumn, Page, PageAction } from 'src/app/models/renderer';
import { EventBusService } from 'src/app/services/event-bus.service';
import { RendererService } from 'src/app/services/renderer.service';
import { MessageBox } from '../components/message-box/message-box.provider';
import { PageWrapperComponent } from '../page-wrapper/page-wrapper.component';

@Component({
  selector: 'app-popup-renderer',
  templateUrl: './popup-renderer.component.html',
  styleUrls: ['./popup-renderer.component.less']
})
export class PopupRendererComponent implements OnInit {
  @ViewChild('pageWrapper') pageWrapper:PageWrapperComponent;
  pageAction: PageAction = {} as PageAction;
  defaultData: any;
  popupJson: any;
  parentId: string = '';

  page?: Page = undefined;
  listOfColumn: GridColumn[] = [];
  gridData: any[] = [];
  gridDataSource: string = '';
  postApi = '';
  postSchema: any = undefined;
  errors: any;
  pageTitlePrefix: string = '';
  initialData: any;
  deleteApi: string = '';
  selectedTabIndex: number = 0;
  isDynamicFormRendered = false;
  constructor(
    //public dialogRef: MatDialogRef<PopupRendererComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rendererService: RendererService,
    public dialog: MatDialog,
    private mb: MessageBox) {

      if (data && data.pageAction) {
        this.pageAction = data.pageAction;
        this.defaultData = data.defaultData;
        
        this.parentId = data.id;
        this.popupJson = this.pageAction.event?.popupJson;
        this.deleteApi = data.pageAction.event?.api;
      }
  }
  ngOnInit(): void {
    this.getJsonObj();

  }

  getJsonObj() {
    if (this.popupJson && this.popupJson.length > 0) {
      this.rendererService.getPageJson(this.popupJson + '.json').subscribe((json) => {
        this.page = json;
        if (this.page.pageTitlePrefix == 'addedit') {
          if (this.parentId && this.parentId.length > 0) {
            this.pageTitlePrefix = 'Edit';
          } else {
            this.pageTitlePrefix = 'Add';
          }
        }
       this.pageWrapper.setDefaultData(this.defaultData);
      },
        (err: any) => {
          this.errors = err.error.msg;
        }
      );

    }
  }
  
  popupActionClick(action: PageAction, event: Event) {
    this.pageWrapper.popupActionClick(action,event);
   
  }

 

}