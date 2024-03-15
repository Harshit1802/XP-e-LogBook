
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPassportComponent } from 'src/app/layout/passport/passport.component';
import { DashboardModule } from './dashboard.module';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
    // passport
    { path: '', component: DashboardComponent, },

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }