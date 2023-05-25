import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialPageV2Component } from './initial-page-v2.component';

describe('InitialPageV2Component', () => {
  let component: InitialPageV2Component;
  let fixture: ComponentFixture<InitialPageV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitialPageV2Component]
    });
    fixture = TestBed.createComponent(InitialPageV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
