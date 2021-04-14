import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RavvsPage } from './ravvs.page';

describe('RavvsPage', () => {
  let component: RavvsPage;
  let fixture: ComponentFixture<RavvsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RavvsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RavvsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
