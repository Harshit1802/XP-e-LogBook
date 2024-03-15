import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { LoginService } from '../services/login.service';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { TileComponent } from './tile/tile.component';
import { FilterComponent } from './filter/filter.component';
import { RendererService } from '../services/renderer.service';
import { TableComponent } from './table/table.component';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-form/components/dynamic-field/dynamic-field.directive';
import { FormTypeTextComponent } from './dynamic-form/components/form-type-text/form-type-text.component';
import { MaterialModule } from './material.module';
import { RendererComponent } from './renderer/renderer.component';
import { EventBusService } from '../services/event-bus.service';
import { PopupRendererComponent } from './popup-renderer/popup-renderer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './spinner/loader-intercept.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationService } from '../services/notification.service';
import { ErrorPanelComponent } from './components/error-panel/error-panel.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { MessageBox } from './components/message-box/message-box.provider';
import { FormThumbnailComponent } from './components/form-thumbnail/form-thumbnail.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { CheckBoxListComponent } from './checkbox-list/checkbox-list.component';
import { DatepickerComponent } from './range-calender/range-calender.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SchedularCalenderComponent } from './schedular-calender/schedular-calender.component';
import { EventsService } from '../services/event.service';
import { RnDashboardComponent } from '../routes/dashboard/dashboard/clinician-rn-dashboard/rn-dashboard/rn-dashboard.component';
import { MatCardsComponent } from './mat-cards/mat-cards.component';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { MatDialogRef } from '@angular/material/dialog';
// must go before plugins

export const SHARED_ZORRO_MODULES = [
  NzLayoutModule,
  NzButtonModule,
  NzMessageModule,
  NzDropDownModule,
  NzGridModule,
  NzCheckboxModule,
  NzToolTipModule,
  NzPopoverModule,
  NzSelectModule,
  NzIconModule,
  NzBadgeModule,
  NzAlertModule,
  NzModalModule,
  NzTableModule,
  NzDrawerModule,
  NzTabsModule,
  NzInputModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzTagModule,
  NzInputNumberModule,
  NzBreadCrumbModule,
  NzListModule,
  NzSwitchModule,
  NzRadioModule,
  NzFormModule,
  NzAvatarModule,
  NzSpinModule,
  NzCardModule,
  NzDividerModule,
  NzProgressModule,
  NzPopconfirmModule,
  NzUploadModule,
  NzCarouselModule,
  NgxMatTimepickerModule
];

const THIRDMODULES: Array<Type<any>> = [];
// #endregion

// #region your componets & directives
const COMPONENTS: Array<Type<any>> = [
  AppMenuComponent, AppHeaderComponent,
  AppFooterComponent,
  PageHeaderComponent,
  SubMenuComponent,
  TileComponent,
  FilterComponent,
  TableComponent,
  EditableTableComponent,
  DynamicFormComponent,
  RendererComponent,
  PopupRendererComponent,
  PageWrapperComponent,
  SpinnerComponent,
  FileUploadComponent,
  NotificationComponent,
  ErrorPanelComponent,
  MessageBoxComponent,
  FormThumbnailComponent,
  CheckBoxListComponent,
  DatepickerComponent,
  SchedularCalenderComponent,
  RnDashboardComponent,
  MatCardsComponent
];
const DIRECTIVES: Array<Type<any>> = [DynamicFieldDirective];

const SERVICES: Array<Type<any>> = [LoginService, RendererService, EventBusService, SpinnerService, NotificationService, EventsService];
// #endregion

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, FormTypeTextComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    ...SHARED_ZORRO_MODULES,
    FullCalendarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FullCalendarModule,
    //MaterialModule,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  providers: [...SERVICES,
  {
    provide: MatDialogRef,
    useValue: {}
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true,

  },
    MessageBox
  ]
})
export class SharedModule { }
