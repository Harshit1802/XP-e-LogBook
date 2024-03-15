import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FilterControls, GridPagination } from 'src/app/models/renderer';


@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})
export class FilterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() controls: FilterControls[]=[];
  @Input() resetFilter: any = false;
  @Output() filterData = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @Output() controlsChange = new EventEmitter();
  //controlList: any;
  filterCount: number = 0;
  @Input() pagination:GridPagination={} as GridPagination;
  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.controls && this.controls.length > 0) {
      this.controls = JSON.parse(JSON.stringify(this.controls));
      this.controls.forEach(element => {
        if (element.defaultValue && element.defaultValue.length > 0 && (!element.value || element.value.length < 1)) {
          element.value = element.defaultValue;
        }
      });
      this.filterChange();
    }
  }
  ngOnDestroy(): void {

  }
  searchClick() {
    this.filterChange();
    this.controls.forEach((element:FilterControls) => {
      element.value = element.value ? element.value : (element.defaultValue??'')
    });
    const selection = this.controls.map(element => {
      return {
        name: element.name,
        value: element.value,
        isFilterApplied: false
      }
    });
    selection[0].isFilterApplied = true;
    this.resetPagination();
    this.filterData.emit(selection);
  }

  clearFilter() {
    let isFilterApplied = false;
    this.controls.forEach((element:FilterControls) => {
      if (element.defaultValue) {
        isFilterApplied = true;
      }
      element.value = element.defaultValue ? (element.defaultValue??'') : '';
    });
    const selection = this.controls.map(element => {
      return {
        name: element.name,
        value: element.defaultValue ? element.defaultValue : null,
        isFilterApplied: false
      }
    });
    selection[0].isFilterApplied = isFilterApplied;
    this.filterChange();
    this.resetPagination();
    this.filterData.emit(selection);
  }

  filterChange() {
    this.filterCount = this.controls.filter(x => x.value && x.value?.toString().length > 0).length;
  }
  resetPagination() {
    if(this.pagination){
      this.pagination.page = 1;
    }
  }

  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.searchClick();
  }

  selectedValueChanged(control:any){
  this.change(control);
  this.selectedValueChange.emit(control)
  }

  change(control:any) {
    this.controlsChange.emit(JSON.parse(JSON.stringify(this.controls)));
  }

  focusControlByFn(index: any, item: any) {
    return index;
  }
}
