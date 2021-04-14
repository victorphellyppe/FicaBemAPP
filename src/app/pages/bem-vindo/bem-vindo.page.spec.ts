import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BemVindoPage } from './bem-vindo.page';

describe('BemVindoPage', () => {
  let component: BemVindoPage;
  let fixture: ComponentFixture<BemVindoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BemVindoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BemVindoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
