import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-pessoa-service',
  templateUrl: './pessoa-service.component.html',
  styleUrls: ['./pessoa-service.component.scss']
})
export class PessoaServiceComponent {

  public register: boolean = true;
  public manage: boolean = false;

  projects = new FormControl('');
  name = new FormControl('');
  cpf = new FormControl('');

  projectsList: any = [
    { nome: 'Projeto 1', id: 1 },
    { nome: 'Projeto 2', id: 2 },
    { nome: 'Projeto 3', id: 3 },
    { nome: 'Projeto 4', id: 4 }
  ];

  public infos : any = {
    name: '',
    cpf: '',
    projects: ''
  }
  

  save(){
    this.infos = {
      name: this.name.value,
      cpf: this.cpf.value,
      projects: this.projects.value
    }

    console.log(this.infos)
  }

  clear(){

  }
}
