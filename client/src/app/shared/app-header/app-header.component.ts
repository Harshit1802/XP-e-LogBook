import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {
  isOpen = true;
  isVisible = false;
  constructor(public loginService:LoginService){

  }
  ngOnInit(): void {
   // console.log(this.loginService.me());
  }
  open(): void {
    this.isOpen = true;
    this.isVisible = true;
  }
  // openError(){
  //   this.visible = true;
  // }
  close(): void {
    //   this.visible = false;
    //   this.isOpen = false;
    this.isVisible = false;
  }
  userProfile() {

  }

  Logout() {
this.loginService.logout();

  }
}
