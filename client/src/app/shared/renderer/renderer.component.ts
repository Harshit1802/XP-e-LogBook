import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { GridColumn, Page, PageAction } from 'src/app/models/renderer';
import { EventBusService } from 'src/app/services/event-bus.service';
import { LoginService } from 'src/app/services/login.service';
import { RendererService } from 'src/app/services/renderer.service';
import { PageWrapperComponent } from '../page-wrapper/page-wrapper.component';
import { PopupRendererComponent } from '../popup-renderer/popup-renderer.component';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.less']
})
export class RendererComponent implements OnInit, OnChanges, OnDestroy {
  @Input() jsonFileName: string = '';
  @ViewChild('pageWrapper') pageWrapper:PageWrapperComponent;
  id: string = '';
  page?: Page = undefined;
  defaultData:any={};

  constructor(private route: ActivatedRoute,
    private router: Router,
    private rendererService: RendererService,
    public loginService:LoginService
    ) { }
  ngOnDestroy(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.jsonFileName && this.jsonFileName.length > 0) {
      this.id = this.jsonFileName;
      this.init();
    }
  }
  ngOnInit(): void {

  }
  init() {
    this.getJsonObj();
  }
  getJsonObj() {
    if (this.id && this.id.length > 0) {
      this.rendererService.getPageJson(this.id + '.json').subscribe((json) => {
        this.page = json;
      },
      error => {
        this.loginService.logout();
       
      });
    }
  }

  actionClick(action: PageAction) {
    if (action) {
      if (action.action == 'filter') {
        //this.isFilter = !this.isFilter;
      }
      else if (action.event?.onevent == 'popup') {
        if(this.pageWrapper){
          this.pageWrapper.openPopup(action, null);
        }
      }
    }

  }

  

  // setPageConfig() {
  //   if (this.page.formConfig && this.page.formConfig.rows.length > 0) {
  //     this.page.formConfig.rows.push({
  //       columns: [{
  //         width:0,
  //         controls: [
  //           {
  //             id: 'hdnId',
  //             type: 'hidden',
  //             fieldId: '_id',
  //             value: "",
  //             isVisible: true
  //           } 
  //         ]
  //       }]
  //     })
  //   }

  //   //will remove
  //   //TODO - SET ParentId from Route/QueryString
  //   if (this.page.pageConfig && this.page.pageConfig.defaultData == 'parent') {
  //     //this.setDefaultValues(this.defaultData);
  //   }
  //   else if (this.page.pageConfig.defaultData == 'api') {
  //     //this.page.pageConfig.api = this.page.pageConfig.api.replace('[parentId]', this.parentId);
  //     this.rendererService.getData(this.page.pageConfig.api).subscribe(res => {
  //       //this.setDefaultValues(res.data);
  //     });
  //   }
    
  // }
}