import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckBoxListComponent } from './checkbox-list.component';


describe('CheckBoxListComponent', () => {
  let component: CheckBoxListComponent;
  let fixture: ComponentFixture<CheckBoxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBoxListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckBoxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
