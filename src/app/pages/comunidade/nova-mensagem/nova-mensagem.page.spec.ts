import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaMensagemPage } from './nova-mensagem.page';

describe('NovaMensagemPage', () => {
  let component: NovaMensagemPage;
  let fixture: ComponentFixture<NovaMensagemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaMensagemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaMensagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
