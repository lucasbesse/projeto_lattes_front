import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectServiceComponent } from './project-service.component';

describe('PessoaServiceComponent', () => {
  let component: ProjectServiceComponent;
  let fixture: ComponentFixture<ProjectServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectServiceComponent]
    });
    fixture = TestBed.createComponent(ProjectServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
