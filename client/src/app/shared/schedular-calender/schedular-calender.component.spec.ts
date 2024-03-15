import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedularCalenderComponent } from './schedular-calender.component';

describe('SchedularCalenderComponent', () => {
  let component: SchedularCalenderComponent;
  let fixture: ComponentFixture<SchedularCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedularCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedularCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
