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

  public showOptions: boolean = false;

  public register: boolean = false
  public manage: boolean = true;

  public editModal: boolean = false;

  projects = new FormControl('');
  name = new FormControl('');
  email = new FormControl('');
  start_date = new FormControl('');
  end_date = new FormControl('');
  formation = new FormControl('');

  projectsList: any = [
    { nome: 'Projeto 1', id: 1 },
    { nome: 'Projeto 2', id: 2 },
    { nome: 'Projeto 3', id: 3 },
    { nome: 'Projeto 4', id: 4 }
  ];

  public infos : any = {

  }
  

  save(){
    this.infos = {
      name: this.name.value,
      email: this.email.value,
      projects: this.projects.value,
      start_date: this.start_date.value,
      end_date: this.end_date.value,
      formation: this.formation.value
    }

    console.log(this.infos)
  }



  clear(){

  }

  closeEditModal(){
    this.editModal = false
  }

  editRegister(e : Event){
    e.stopPropagation()
    this.editModal = true

  }

  stopPropagation(e: Event){
    e.stopPropagation()
  }
}
