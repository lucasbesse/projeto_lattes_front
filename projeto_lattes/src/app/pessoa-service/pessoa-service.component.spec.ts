import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaServiceComponent } from './pessoa-service.component';

describe('PessoaServiceComponent', () => {
  let component: PessoaServiceComponent;
  let fixture: ComponentFixture<PessoaServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaServiceComponent]
    });
    fixture = TestBed.createComponent(PessoaServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
