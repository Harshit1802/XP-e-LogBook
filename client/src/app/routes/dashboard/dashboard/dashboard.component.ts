import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormComponent } from 'src/app/shared/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { Page } from 'src/app/models/renderer';
import { RendererService } from 'src/app/services/renderer.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
 
  @ViewChild('dynamicForm') form!: DynamicFormComponent;
  page?: Page = undefined;
 
  constructor(private rendererService:RendererService){

  }
  ngOnInit(): void {
  //  this.rendererService.getPageJson('add-demo-request.json').subscribe(data=>{
  //   this.page = data;
 //  })
  }
  ngAfterViewInit() {
    // if(this.form){
    //   let previousValid = this.form.valid;
    //   this.form.changes.subscribe(() => {
    //     if (this.form.valid !== previousValid) {
    //       previousValid = this.form.valid;
    //       this.form.setDisabled('submit', !previousValid);
    //     }
    //   });
  
    //   this.form.setDisabled('submit', true);
    // }
    
    //this.form.setValue('name', 'Todd Motto');
  }

  submit(value: {[name: string]: any}) {
    console.log(value);
    console.log(this.form);
  }
}
