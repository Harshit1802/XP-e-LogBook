import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'error-panel',
  templateUrl: './error-panel.component.html',
  styleUrls: ['./error-panel.component.less']
})
export class ErrorPanelComponent implements OnChanges {
  @Input() errors: any;
  objType: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.errors) {
      console.log(this.errors);
      if (this.errors instanceof Array) {
        this.objType = 'array';
      }
      else if (this.errors instanceof String || typeof this.errors == 'string') {
        this.objType = 'string';
      }
      else {
        this.objType = 'object';
      }
    }
  }

  removeError(index?: number): void {
    if (this.objType == 'array' && index !== undefined) {
      this.errors.splice(index, 1);
    } else {
      this.errors = null;
    }
  }
}
