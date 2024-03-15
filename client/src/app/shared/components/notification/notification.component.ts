import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent {


  constructor(private service: NotificationService) {
    
  }

  ngOnInit(): void {
    this.service.errorSubject.subscribe(err=>{
      console.log('Test');
      console.log(err);
    })
}
}
