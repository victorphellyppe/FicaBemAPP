import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolentometroPage } from './violentometro.page';

describe('ViolentometroPage', () => {
  let component: ViolentometroPage;
  let fixture: ComponentFixture<ViolentometroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolentometroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolentometroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
