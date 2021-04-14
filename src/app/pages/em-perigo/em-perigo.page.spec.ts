import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmPerigoPage } from './em-perigo.page';

describe('EmPerigoPage', () => {
  let component: EmPerigoPage;
  let fixture: ComponentFixture<EmPerigoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmPerigoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmPerigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
