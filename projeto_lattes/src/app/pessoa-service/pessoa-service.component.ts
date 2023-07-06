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
  email = new FormControl('');
  formation = new FormControl('');
  experience = new FormControl('');

  public experience_search: boolean = false;
  public formation_search: boolean = false;
  public email_search: boolean = false;
  public name_search: boolean = true;
  public text_search: any = '';

  public placeholder: String = "Busque por nome"

  public searched_infos: any = [];

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

  getData(){
    this.card_infos = []
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
    this.infos = {
      nome: this.name.value,
      email: this.email.value,
      formacao: this.formation.value,
      experiencia: this.experience.value,
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
          this.searched_infos = []
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
    this.email.setValue('')
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
    this.name.setValue(this.selectedPerson.nome)
    this.email.setValue(this.selectedPerson.email)
    this.formation.setValue(this.selectedPerson.formacao)
    this.experience.setValue(this.selectedPerson.experiencia)

  }

  clearFilter(){
    this.searched_infos = []
    this.email_search = false
    this.experience_search = false
    this.formation_search = false
    this.name_search = true;
    this.placeholder = 'Busque por nome'
    this.openFilters = false
  }

  advancedSearch(){
    console.log(this.name_search)
    this.searched_infos = []
    if(this.experience_search == true){
      for(let e of this.card_infos){
        let experience = e.experiencia + ''
        if(experience.includes(this.text_search)){
          this.searched_infos.push(e)
        }
      }
    }
    if(this.formation_search == true){
      for(let e of this.card_infos){
        let formation = e.formacao + ''
        if(formation.includes(this.text_search)){
          this.searched_infos.push(e)
        }
      }
    }
    if(this.email_search == true){
      for(let e of this.card_infos){
        let email = e.email + ''
        if(email.includes(this.text_search)){
          this.searched_infos.push(e)
        }
      }
    }
    if(this.name_search == true){
      for(let e of this.card_infos){
        let nome = e.nome + ''
        if(nome.includes(this.text_search)){
          this.searched_infos.push(e)
        }
      }
    }

    this.experience_search = false
    this.formation_search = false
    this.email_search = false
    this.text_search = ""
    this.placeholder = "Busque por nome"
    this.openFilters = false
  }

  setType(e: number){
    if(e == 1){
      this.email_search = true
      this.experience_search = false
      this.formation_search = false
      this.name_search = false
      this.placeholder = 'Busque por email'
    }
    if(e == 2){
      this.email_search = false
      this.experience_search = true
      this.formation_search = false
      this.name_search = false
      this.placeholder = 'Busque por experiência'
    }
    if(e == 3){
      this.email_search = true
      this.experience_search = false
      this.formation_search = true
      this.name_search = false
      this.placeholder = 'Busque por formação'
    }
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
