import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ControlConfig, Page, PageActionEvent } from 'src/app/models/renderer';
import { RendererService } from 'src/app/services/renderer.service';
import { PopupRendererComponent } from '../popup-renderer/popup-renderer.component';

@Component({
  selector: 'app-mat-cards',
  templateUrl: './mat-cards.component.html',
  styleUrls: ['./mat-cards.component.less']
})
export class MatCardsComponent implements OnInit ,OnChanges{

  constructor(private route: ActivatedRoute,
    private rendererService: RendererService,
    public dialog: MatDialog) { }
@Input() controlConfig: ControlConfig = {} as ControlConfig;
@Input() gridData: any[] = [];
pendingTask:any[]=[];
page?:Page=undefined;
ngOnInit(): void {

  if (this.pendingTask && this.pendingTask.length > 0) {
    this.pendingTask = JSON.parse(JSON.stringify(this.pendingTask));

  }
  //  this.pendingTask = [{patientName:"Sky Morthan",patientMRN:"23234",TaskType:"RN EVALUATION",taskWeekDateRange:"01/07/24 - 01/13/24"},{patientName:"Sky Morthan",patientMRN:"23234",TaskType:"RN EVALUATION",taskWeekDateRange:"01/07/24 - 01/13/24"}
  // ,{patientName:"Sky Morthan",patientMRN:"23234",TaskType:"RN EVALUATION",taskWeekDateRange:"01/07/24 - 01/13/24"}]
}
 ngOnChanges(changes: SimpleChanges): void {
  if (this.gridData && this.gridData.length > 0) {
     this.pendingTask = JSON.parse(JSON.stringify(this.gridData));
  
  }
 }
onCardClick(item:any,event:any){
console.log("pending",item)
  this.openPopup(event ,item)
}
openPopup(event: PageActionEvent, defaultData: any) {
  const dialogRef = this.dialog.open(PopupRendererComponent, {
    width: event.popupwidth ? event.popupwidth : '40%',
    data: {
      PageActionEvent: event,
      defaultData: defaultData ? defaultData : null,
      id: defaultData ? defaultData._id : ''
    },
  });
  dialogRef.afterClosed().subscribe(result => {
  
  });
}
}
