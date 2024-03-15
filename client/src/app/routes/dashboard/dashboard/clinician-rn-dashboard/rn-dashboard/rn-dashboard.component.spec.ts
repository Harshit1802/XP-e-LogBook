import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnDashboardComponent } from './rn-dashboard.component';

describe('RnDashboardComponent', () => {
  let component: RnDashboardComponent;
  let fixture: ComponentFixture<RnDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RnDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RnDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
