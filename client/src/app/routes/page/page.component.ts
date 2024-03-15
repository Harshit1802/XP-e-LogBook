import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent {
  popUpJson: string = '';


  constructor(private route: ActivatedRoute,
  ) { 
    this.route.url.subscribe(params => {
      if (this.route.snapshot.paramMap.get('id')) {
        this.popUpJson = this.route.snapshot.paramMap.get('id') ?? '';
      }
    })
  }
  ngOnInit(): void {
   

  }
}