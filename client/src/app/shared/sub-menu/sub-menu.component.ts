import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { NavItem } from 'src/app/models/renderer';

@Component({
  selector: 'sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.less']
})
export class SubMenuComponent implements OnInit {
  @Input() subMenuItems: NavItem[]=[];
  currentURL: string;

  constructor(private router: Router,

    private location: Location) {

      this.currentURL = this.location.path();
  }
  ngOnInit(): void {  

  }
  navigate(url: string) {

    this.router.navigateByUrl(url);

  }

}
