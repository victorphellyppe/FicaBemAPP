import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasMensagensPage } from './minhas-mensagens.page';

describe('MinhasMensagensPage', () => {
  let component: MinhasMensagensPage;
  let fixture: ComponentFixture<MinhasMensagensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasMensagensPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasMensagensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
