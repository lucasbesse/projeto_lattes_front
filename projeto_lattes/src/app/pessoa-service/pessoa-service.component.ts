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
export class PessoaServiceComponent implements OnInit {

  ngOnInit(): void {
    fetch('http://localhost:5000/pessoas?limit=200&offset=0').then(data=>{
      return data.json()
    }).then((result=>{
      console.log(result)
      this.card_infos = result
      for(let r of this.card_infos){
        r.showOptions = false
      }
    }))
  }

  public selectedPerson: any = {}

  public showOptions: boolean = false;
  public card_infos: any = []
  public register: boolean = false
  public manage: boolean = true;

  public editModal: boolean = false;

  name = new FormControl('');
  email = new FormControl('');
  formation = new FormControl('');
  experience = new FormControl('');

  public error: boolean = false;

  public dummyInfos: any = [
    {nome: 'Lucas Bessegat Goncalves', email: 'lucas.besse', formacao: 'formação', experiencia: 'experiencia1'},
    {nome: 'João Silva', email: 'joao.silva', formacao: 'formação', experiencia: 'experiencia2'},
    {nome: 'Maria Santos', email: 'maria.santos', formacao: 'formação', experiencia: 'experiencia3'},
    {nome: 'Carlos Oliveira', email: 'carlos.oliveira', formacao: 'formação', experiencia: 'experiencia4'},
    {nome: 'Ana Pereira', email: 'ana.pereira', formacao: 'formação', experiencia: 'experiencia5'},
    {nome: 'Pedro Rocha', email: 'pedro.rocha', formacao: 'formação', experiencia: 'experiencia6'},
    {nome: 'Isabela Ferreira', email: 'isabela.ferreira', formacao: 'formação', experiencia: 'experiencia7'},
    {nome: 'Rafael Santos', email: 'rafael.santos', formacao: 'formação', experiencia: 'experiencia8'}
  ]


  public infos : any = {

  }
  

  save(){
    this.infos = {
      nome: this.name.value,
      email: this.email.value,
      formacao: this.formation.value,
      experiencia: this.experience.value,
    }

    if(this.infos.nome == ''){
      this.error = true
      return
    }
    else{
      this.error = false
      fetch('http://localhost:5000/pessoas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.infos)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
            
        }

    console.log(this.infos)
  }


  


  clear(){

  }

  closeEditModal(){
    this.editModal = false
  }

  editRegister(e : Event, person: any){
    e.stopPropagation()
    this.editModal = true
    this.selectedPerson = person
    this.name.setValue(this.selectedPerson.nome)
    this.email.setValue(this.selectedPerson.email)
    this.formation.setValue(this.selectedPerson.formacao)
    this.experience.setValue(this.selectedPerson.experiencia)

  }

  stopPropagation(e: Event){
    e.stopPropagation()
  }
}
