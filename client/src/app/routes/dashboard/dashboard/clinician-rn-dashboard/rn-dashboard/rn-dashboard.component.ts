import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { GridColumn, Page, PageAction } from 'src/app/models/renderer';
import { RendererService } from 'src/app/services/renderer.service';
@Component({
  selector: 'app-rn-dashboard',
  templateUrl: './rn-dashboard.component.html',
  styleUrls: ['./rn-dashboard.component.less']
})

  
export class RnDashboardComponent implements OnInit{

  constructor(private route: ActivatedRoute,
    private rendererService: RendererService,
    public dialog: MatDialog) { }

    
pendingTask:any[]=[];
page?:Page=undefined;
ngOnInit(): void {
  // this.pendingTask = [{patientName:"Sky Morthan",patientMRN:"23234",TaskType:"RN EVALUATION",WeekDateRange:"01/07/24 - 01/13/24"},{patientName:"Sky Morthan",patientMRN:"23234",TaskType:"RN EVALUATION",WeekDateRange:"01/07/24 - 01/13/24"}
  // ,{patientName:"Sky Morthan",patientMRN:"23234",TaskType:"RN EVALUATION",WeekDateRange:"01/07/24 - 01/13/24"}]
}
// onCardClick(item){
// console.log("pending",item)
//   //this.getJsonObj() 
// }

// getJsonObj() {
 
//     this.rendererService.getPageJson('schedule-visit' + '.json').subscribe((json) => {
//       this.page = json;
      
      
//     });
//   }
}
