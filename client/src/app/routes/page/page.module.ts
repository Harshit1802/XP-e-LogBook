import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageComponent } from './page.component';



@NgModule({
  declarations: [PageComponent],
  imports: [
    SharedModule,
    PageRoutingModule
  ]
})
export class PageModule { }
