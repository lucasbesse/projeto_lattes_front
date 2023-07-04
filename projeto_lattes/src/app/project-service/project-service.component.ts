import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-pessoa-service',
  templateUrl: './project-service.component.html',
  styleUrls: ['./project-service.component.scss']
})
export class ProjectServiceComponent {

  ngOnInit(): void {
    this.getData()
  }

  public selectedPerson: any = {}

  public showOptions: boolean = false;
  public card_infos: any = []
  public register: boolean = false
  public manage: boolean = true;
  public openFilters: boolean = false

  public editModal: boolean = false;

  name = new FormControl('');
  descricao = new FormControl('');
  formation = new FormControl('');
  experience = new FormControl('');

  public error: boolean = false;

  public dummyInfos: any = [
    {nome: 'Lucas Bessegat Goncalves', descricao: 'lucas.besse', formacao: 'formação', experiencia: 'experiencia1'},
    {nome: 'João Silva', descricao: 'joao.silva', formacao: 'formação', experiencia: 'experiencia2'},
    {nome: 'Maria Santos', descricao: 'maria.santos', formacao: 'formação', experiencia: 'experiencia3'},
    {nome: 'Carlos Oliveira', descricao: 'carlos.oliveira', formacao: 'formação', experiencia: 'experiencia4'},
    {nome: 'Ana Pereira', descricao: 'ana.pereira', formacao: 'formação', experiencia: 'experiencia5'},
    {nome: 'Pedro Rocha', descricao: 'pedro.rocha', formacao: 'formação', experiencia: 'experiencia6'},
    {nome: 'Isabela Ferreira', descricao: 'isabela.ferreira', formacao: 'formação', experiencia: 'experiencia7'},
    {nome: 'Rafael Santos', descricao: 'rafael.santos', formacao: 'formação', experiencia: 'experiencia8'}
  ]


  public infos : any = {

  }

  getData(){
    this.card_infos = []
    fetch('http://localhost:5000/projetos?limit=200&offset=0').then(data=>{
      return data.json()
    }).then((result=>{
      console.log(result)
      this.card_infos = result
      for(let r of this.card_infos){
        r.showOptions = false
      }
    }))
  }

  deleteRegister(e:Event, id: any){
    e.stopPropagation()
    fetch(`http://localhost:5000/pessoas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.selectedPerson = '' 
          this.editModal = false
          this.getData()
          this.alert('alert', 'Pessoa deletada com sucesso.')
        })
        .catch(error => {
          console.error(error);
        });

  }
  

  save(edit?: any, id?: any){
    console.log(edit)
    this.infos = {
      titulo: this.name.value,
      descricao: this.descricao.value
    }

    if(edit){
      fetch(`http://localhost:5000/pessoas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.infos)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.selectedPerson = ''
          this.editModal = false
          this.getData()
          this.alert('alert', 'Informações atualizadas com sucesso.')
        })
        .catch(error => {
          console.error(error);
        });


    }
    else{
      if(this.infos.nome == ''){
        this.error = true
        return
      }
      else{
        this.error = false
        fetch('http://localhost:5000/projetos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.infos)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.alert('alert', 'Pessoa criada com sucesso.')
        })
        .catch(error => {
          console.error(error);
        });
              
        }
    }

    console.log(this.infos)
    this.clear()
  }


  


  clear(){
    this.name.setValue('')
    this.descricao.setValue('')
    this.formation.setValue('')
    this.experience.setValue('')
  }

  closeEditModal(){
    this.editModal = false
  }

  editRegister(e : Event, person: any){
    e.stopPropagation()
    this.editModal = true
    this.selectedPerson = person
    this.name.setValue(this.selectedPerson.titulo)
    this.descricao.setValue(this.selectedPerson.descricao)

  }

  stopPropagation(e: Event){
    e.stopPropagation()
  }




  openFiltersModal(){
    this.openFilters = !this.openFilters
  }
  closeFiltersModal(){
    this.openFilters = false
  }




  alert(type: any, text: string){
    if(type == 'alert'){
        let alert = document.querySelector('.alert') as HTMLDivElement
        alert.style.display = 'flex'
        alert.innerHTML = text
        setTimeout(()=>{
          alert.style.display = 'none'
        }, 4000)
    }
    if(type == 'warning'){
        let alert = document.querySelector('.warning') as HTMLDivElement
        alert.style.display = 'flex'
        alert.innerHTML = text
        setTimeout(()=>{
          alert.style.display = 'none'
        }, 4000)
    }
}
}
