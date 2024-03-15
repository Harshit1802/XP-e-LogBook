import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RnDashboardComponent } from './dashboard/clinician-rn-dashboard/rn-dashboard/rn-dashboard.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  declarations: [
    DashboardComponent,
    
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    MaterialModule,
    LayoutModule
  ]
})
export class DashboardModule { }
