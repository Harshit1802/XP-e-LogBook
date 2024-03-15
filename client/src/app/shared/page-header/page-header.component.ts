import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FilterControls, NavItem, PageAction } from 'src/app/models/renderer';
import { EventBusService } from 'src/app/services/event-bus.service';


@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less']
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle: string='';
  @Input() breadcrumbs: NavItem[]=[];
  @Input() filterControls: FilterControls[]=[];
  @Input() actions: PageAction[] = [];
  @Output() onAction = new EventEmitter<any>();
  isFilter:boolean = false;
  isVisible:boolean=false;
  test='add-demo-request';
  constructor(private router: Router,
    private eventBusService: EventBusService) { }

  ngOnInit(): void {
  }
  navigate(url: string) {
    this.router.navigateByUrl(url);
  }
  actionClick(action: PageAction) {
    if(action){
      if(action.action == 'filter'){
        this.isFilter = !this.isFilter;
      }
      else if(action.event?.onevent == 'popup'){
        this.eventBusService.publish({name:"openpopup", data : action});
       
      }
    }

  }

}
