import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange, DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY, MatMonthView, MatRangeDateSelectionModel } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ControlConfig } from 'src/app/models/renderer';


@Component({
  selector: 'range-datepicker',
  templateUrl: './range-calender.component.html',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy
    },
    DefaultMatCalendarRangeStrategy,
    MatRangeDateSelectionModel
  ]
})
export class DatepickerComponent implements OnChanges {
  // @ViewChild('matMonthView1') matMonthView1: MatMonthView<Moment>;
  // @ViewChild('matMonthView2') matMonthView2: MatMonthView<Moment>;
  @Input() controlConfig: ControlConfig = {} as ControlConfig;
  @Input() value: string="";
  // Private
  // _startDate: Moment | null = null;
  // _endDate: Moment | null = null;
  array:string[];
  dateRange: DateRange<Date>;
  // // Set the range
  // range: { start: Moment | null; end: Moment | null } = {
  //   start: moment()
  //     .endOf('month')
  //     .subtract(1, 'week'),
  //   end: moment()
  //     .endOf('month')
  //     .add(1, 'week')
  // };

  // // DateRange instance using range
  // dateRange = new DateRange(this.range.start, this.range.end);

  // // Set min and max dates
  // minDate = moment()
  //   .subtract(1, 'week')
  //   .startOf('week');
  // maxDate = moment()
  //   .add(1, 'month')
  //   .add(2, 'weeks')
  //   .startOf('week');

  // // Set the months for calendar view
  // firstMonth = moment().startOf('month');
  // secondMonth = moment()
  //   .startOf('month')
  //   .add(1, 'month');

  constructor(private _dateAdapter: DateAdapter<Moment>,  private readonly selectionModel: MatRangeDateSelectionModel<Date>,
    private readonly selectionStrategy: DefaultMatCalendarRangeStrategy<Date>) {}
  ngOnChanges(): void {
    if(this.value && this.value!=""){
   this.array=this.value.split(" - ");
   let start=new Date(this.array[0]);
   let endDate=new Date(this.array[1]);
   let _startDate=moment(start);
   let _endDate=moment(endDate);
   this.dateRange = new DateRange(start, endDate);
   
    }
  }

  /**
   * On selected date change
   */
  // selectedChange(date: Moment): void {
  //   if (!this._startDate) {
  //     this._startDate = date;
  //   } else if (
  //     !this._endDate &&
  //     this._dateAdapter.compareDate(date, this._startDate) >= 0
  //   ) {
  //     this._endDate = date;
  //   } else {
  //     this._startDate = date;
  //     this._endDate = null;
  //   }

  //   this.range.start = this._startDate;
  //   this.range.end = this._endDate;
  //   this.dateRange = new DateRange(this._startDate, this._endDate);
  // }

  // moveViewMonths(forward: boolean = true): void {
  //   let firstMonth;
  //   let secondMonth;

  //   if (forward) {
  //     firstMonth = moment(this.firstMonth)
  //       .startOf('month')
  //       .add(1, 'month');
  //     secondMonth = moment(this.secondMonth)
  //       .startOf('month')
  //       .add(1, 'month');
  //   } else {
  //     firstMonth = moment(this.firstMonth)
  //       .startOf('month')
  //       .subtract(1, 'month');
  //     secondMonth = moment(this.secondMonth)
  //       .startOf('month')
  //       .subtract(1, 'month');
  //   }

  //   this.firstMonth = firstMonth;
  //   this.secondMonth = secondMonth;
  // }

  // previousClicked() {
  //   this.matMonthView1.activeDate = this._dateAdapter.addCalendarMonths(
  //     this.matMonthView1.activeDate,
  //     -1
  //   );

  //   this.matMonthView2.activeDate = this._dateAdapter.addCalendarMonths(
  //     this.matMonthView2.activeDate,
  //     -1
  //   );
  // }

  // nextClicked() {
  //   this.matMonthView1.activeDate = this._dateAdapter.addCalendarMonths(
  //     this.matMonthView1.activeDate,
  //     1
  //   );

  //   this.matMonthView2.activeDate = this._dateAdapter.addCalendarMonths(
  //     this.matMonthView2.activeDate,
  //     1
  //   );
  // }

  // /** Whether the previous period button is enabled. */
  // previousEnabled(): boolean {
  //   if (!this.matMonthView1 || !this.matMonthView1.minDate) {
  //     return true;
  //   }
  //   return (
  //     !this.matMonthView1.minDate ||
  //     !this._isSameView(
  //       this.matMonthView1.activeDate,
  //       this.matMonthView1.minDate
  //     )
  //   );
  // }

  // /** Whether the next period button is enabled. */
  // nextEnabled(): boolean {
  //   if (!this.matMonthView2 || !this.matMonthView2.maxDate) {
  //     return true;
  //   }
  //   return (
  //     !this.matMonthView2.maxDate ||
  //     !this._isSameView(
  //       this.matMonthView2.activeDate,
  //       this.matMonthView2.maxDate
  //     )
  //   );
  // }

  // /** Whether the two dates represent the same view in the current view mode (month). */
  // private _isSameView(date1: Moment, date2: Moment): boolean {
  //   return (
  //     this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2) &&
  //     this._dateAdapter.getMonth(date1) == this._dateAdapter.getMonth(date2)
  //   );
  // }
}

