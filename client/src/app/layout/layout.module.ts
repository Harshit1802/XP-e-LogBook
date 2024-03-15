import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicHeaderComponent } from './basic/shared/public-header/public-header.component';
import { PublicFooterComponent } from './basic/shared/public-footer/public-footer.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutPassportComponent } from './passport/passport.component';
import { SecureLayoutComponent } from './secure-layout/secure-layout.component';



@NgModule({
  declarations: [
    PublicHeaderComponent,
    PublicFooterComponent,
    LayoutPassportComponent,
    SecureLayoutComponent
  ],
  imports: [
    SharedModule
  ],
  exports:[
    PublicHeaderComponent,
    PublicFooterComponent,
    LayoutPassportComponent
  ]
})
export class LayoutModule { }
