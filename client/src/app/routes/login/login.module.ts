import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LayoutModule,
    SharedModule,
    MaterialModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
