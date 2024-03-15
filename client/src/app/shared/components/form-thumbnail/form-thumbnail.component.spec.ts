import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormThumbnailComponent } from './form-thumbnail.component';

describe('FormThumbnailComponent', () => {
  let component: FormThumbnailComponent;
  let fixture: ComponentFixture<FormThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
