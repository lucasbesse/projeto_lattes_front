import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaServiceComponent } from './pessoa-service/pessoa-service.component';
import { ProjectServiceComponent } from './project-service/project-service.component';
import { InitialPageComponent } from './initial-page/initial-page.component'
import { InitialPageV2Component } from './initial-page-v2/initial-page-v2.component';
import { ResultServiceComponent } from './result-service/result-service.component';

const routes: Routes = [
  {path: '', component: InitialPageV2Component},
  {path: 'pessoa', component: PessoaServiceComponent},
  {path: 'projeto', component: ProjectServiceComponent},
  {path: 'resultado', component: ResultServiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
