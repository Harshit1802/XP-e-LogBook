import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less']
})
export class LayoutPassportComponent implements OnInit {
  loading=false;
  passwordVisible=false;
  links = [
    {
      title: '帮助',
      href: ''
    },
    {
      title: '隐私',
      href: ''
    },
    {
      title: '条款',
      href: ''
    }
  ];

  constructor() {}

  ngOnInit(): void {
  }
}
