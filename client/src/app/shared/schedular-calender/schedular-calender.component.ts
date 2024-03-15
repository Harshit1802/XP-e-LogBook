import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { fromEventPattern } from 'rxjs';
import { EventsService } from 'src/app/services/event.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ControlConfig, PageActionEvent } from 'src/app/models/renderer';
import { Title } from '@angular/platform-browser';
import { PopupRendererComponent } from '../popup-renderer/popup-renderer.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-schedular-calender',
  templateUrl: './schedular-calender.component.html',
  styleUrls: ['./schedular-calender.component.less']
})
export class SchedularCalenderComponent implements OnInit,OnChanges {
  options:any;
  eventsModel:any[];
  calendar: Calendar;
  dayClicked = new EventEmitter();
  @Input() controlConfig: ControlConfig = {} as ControlConfig;
  @Input() gridData: any[] = [];
  constructor(private el: ElementRef,public dialog: MatDialog) {
  }

  event(eventName: any) {
    return fromEventPattern(
      handler => this.calendar.on(eventName, handler),
      handler => this.calendar.off(eventName, handler)
    );
  }
ngOnChanges(changes: SimpleChanges): void {
  this.eventsModel = this.gridData.map(x=>{
    return {
      id: x._id,
     allDay: false,
     sTime: x.taskStartTime,
     taskstatus: x.taskStatus,
     isMissed: false,
     eTime: x.taskEndTime,
      isVoid: false,
      title: x.patientName,
      start: x.startTime,
      end:x.endTime,
      data:x
    } as any;
  });
  this.calanderrender();
}
  ngOnInit() {
     
    // this.eventsModel = [
    //   { title: "Test", start: "2024-02-21T01:30:00", end: "2024-02-21T02:30:00" },
    //   { title: "Mogli", start: "2024-02-28T01:30:00", end: "2024-02-28T02:30:00" }
    // ]
    this.calanderrender();
   
  }
  handleEventClick(info) {
    console.log('Event clicked:', info.event);
    let event=this.controlConfig.event;
    let defaultData =info.event._def.extendedProps.data;
    this.openPopup(event ,defaultData)
  }
  openPopup(event:any ,defaultData:any) {
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

  calanderrender(){
    this.calendar = new Calendar(this.el.nativeElement, {
  
      // add other plugins
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialView: 'dayGridMonth', // Set initial view to month
      selectable: true,
      editable: true,
      events: this.eventsModel,
      weekNumbers: true, // Show week numbers
      weekNumberCalculation: 'ISO', // ISO week numbering
      eventClick: this.handleEventClick.bind(this),
  });
  this.calendar.render();

  }
}