import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnrollClassPage } from './enroll-class.page';

describe('EnrollClassPage', () => {
  let component: EnrollClassPage;
  let fixture: ComponentFixture<EnrollClassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
