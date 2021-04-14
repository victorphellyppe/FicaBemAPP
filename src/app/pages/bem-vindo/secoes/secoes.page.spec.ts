import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecoesPage } from './secoes.page';

describe('SecoesPage', () => {
  let component: SecoesPage;
  let fixture: ComponentFixture<SecoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
