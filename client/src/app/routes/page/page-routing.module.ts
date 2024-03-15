import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';



const routes: Routes = [
    // passport
   // { path: '', component: PageComponent, },
    { path: 'page/:id', component: PageComponent },

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }