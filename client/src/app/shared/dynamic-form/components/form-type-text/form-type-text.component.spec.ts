import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTypeTextComponent } from './form-type-text.component';

describe('FormTypeTextComponent', () => {
  let component: FormTypeTextComponent;
  let fixture: ComponentFixture<FormTypeTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTypeTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTypeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
