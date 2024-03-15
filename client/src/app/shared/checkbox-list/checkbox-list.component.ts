
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlConfig, GridColumn, PageAction } from 'src/app/models/renderer';
import { RendererService } from 'src/app/services/renderer.service';


@Component({
  selector: 'checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.less']
})
export class CheckBoxListComponent implements OnChanges, OnInit {

  @Input() controlConfig: ControlConfig = {} as ControlConfig;
  @Input() value: string[] = [];
  @Output() onCheckChange = new EventEmitter<any>();

  @Input() cbData: any[] = [];
  constructor(public renderService: RendererService) { }
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.cbData && this.cbData.length > 0 && this.value && this.value.length > 0){
      this.setDefaultValue();
    }

  }
  setDefaultValue() {
    this.cbData.forEach(group => {
      if (group[this.controlConfig.options.dataField] && group[this.controlConfig.options.dataField].length > 0) {
        group[this.controlConfig.options.dataField].forEach(cb => {
          cb.checked=this.value.indexOf(cb._id) >= 0 || this.value.indexOf(cb.id) >= 0 ? true : false;
        });
      }
    });
  }

  checkChange(){
    let checkedItems = []
    this.cbData.forEach(group => {
      if (group[this.controlConfig.options.dataField] && group[this.controlConfig.options.dataField].length > 0) {
        group[this.controlConfig.options.dataField].filter(x=>x.checked).forEach(cb => {
          checkedItems.push(cb.id);
        });
      }
    });
    this.onCheckChange.emit(checkedItems);
  }
}
