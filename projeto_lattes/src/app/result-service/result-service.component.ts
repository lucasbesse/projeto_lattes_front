import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-pessoa-service',
  templateUrl: './result-service.component.html',
  styleUrls: ['./result-service.component.css']
})
export class ResultServiceComponent {

  ngOnInit(): void {
    this.getData()
    this.getPersonData()
    this.getProjectData()
  }

  public selectedPerson: any = {}

  public person_data: any = [];
  public project_data: any = [];

  public integrantes: any = [];
  public pesquisadores: any = [];

  public projeto: any;

  public integrantes_edicao: any = [];
  public pesquisadores_edicao: any = [];
  public pessoasList = [
    {
      codigo: 1,
      email: "abcd@email.com",
      experiencia: "nenhuma",
      formacao: "nada",
      nome: "João"
    },
    {
      codigo: 2,
      email: "efgh@email.com",
      experiencia: "pouca",
      formacao: "graduação",
      nome: "Maria"
    },
    {
      codigo: 3,
      email: "ijkl@email.com",
      experiencia: "alguma",
      formacao: "pós-graduação",
      nome: "Pedro"
    },
    {
      codigo: 4,
      email: "mnop@email.com",
      experiencia: "muita",
      formacao: "doutorado",
      nome: "Ana"
    },
    {
      codigo: 5,
      email: "qrst@email.com",
      experiencia: "pouca",
      formacao: "graduação",
      nome: "Carla"
    },
    {
      codigo: 6,
      email: "uvwx@email.com",
      experiencia: "nenhuma",
      formacao: "nada",
      nome: "José"
    }
  ];

  
  

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
  tipo = new FormControl('');

  public error: boolean = false;

  public searched_infos: any = [];
  public text_search: string = "";

  public deletarRelacoes: any = [];




  public infos : any = {

  }

  getData(){
    this.card_infos = []
    fetch('http://localhost:5000/resultados?limit=200&offset=0').then(data=>{
      return data.json()
    }).then((result=>{
      console.log(result)
      this.card_infos = result
      for(let r of this.card_infos){
        let integrantes = []
        let pesquisadores = []
        r.showOptions = false
        for(let p of r.pessoas){
          if(p.tipo == "i"){
            p.pessoa.show = true
            integrantes.push(p.pessoa)
          }
          if(p.tipo == "p"){
            p.pessoa.show = true
            pesquisadores.push(p.pessoa)
          }
        }
        r.pesquisadores = pesquisadores
        r.integrantes = integrantes
      }
    }))
  }

  deleteRegister(e:Event, id: any){
    e.stopPropagation()
    fetch(`http://localhost:5000/resultados/${id}`, {
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
          this.alert('alert', 'Resultado deletado com sucesso.')
        })
        .catch(error => {
          console.error(error);
        });
  }
  

  save(edit?: any, id?: any){
    this.error = false
    if(this.descricao.value?.length == 0 || this.name.value?.length == 0){
      this.error = true
      return
    }
    let arrayPessoas = []
    for(let i of this.integrantes){
      let obj = {
        tipo: "i",
        codigo: i.codigo
      }
      arrayPessoas.push(obj)
    }
    for(let i of this.pesquisadores){
      let obj = {
        tipo: "p",
        codigo: i.codigo
      }
      arrayPessoas.push(obj)
    }

    this.infos = {
      titulo: this.name.value,
      descricao: this.descricao.value,
      pessoas: arrayPessoas,
      tipo: this.tipo.value
    }

    if(edit){
      if(this.projeto != undefined){
        this.infos.projeto_codigo = this.projeto.codigo
      }
      else{
        this.infos.projeto_codigo = this.selectedPerson.projeto.codigo
      }
 
      let pessoasUpdate: Array<any> = []
      pessoasUpdate = this.selectedPerson.pessoas
      this.infos.pessoas = pessoasUpdate
      for(let i of pessoasUpdate){
        i.codigo = i.pessoa.codigo
        delete i.pessoa
      }
      for(let i of pessoasUpdate){
        if(this.deletarRelacoes.length> 0){
          for(let c of this.deletarRelacoes){
            if(i.codigo == c){
              let index = pessoasUpdate.indexOf(i)
              pessoasUpdate.splice(index, 1)
            }
          }
        }
      }
      if(this.integrantes.length > 0){
        for(let i of this.integrantes){
          let obj = {
            tipo: "i",
            codigo: i.codigo
          }
          pessoasUpdate.push(obj)
        }
      }
      if(this.pesquisadores.length > 0){
        for(let i of this.pesquisadores){
          let obj = {
            tipo: "p",
            codigo: i.codigo
          }
          pessoasUpdate.push(obj)
        }
      }
      fetch(`http://localhost:5000/resultados/${id}`, {
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
          this.clear()
        })
        .catch(error => {
          console.error(error);
        });


    }
    else{
      this.infos.projeto_codigo = this.projeto.codigo
      if(this.infos.nome == ''){
        this.error = true
        return
      }
      else{
        this.error = false
        fetch('http://localhost:5000/resultados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.infos)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.alert('alert', 'Resultado criada com sucesso.')
          this.clear()
        })
        .catch(error => {
          console.error(error);
        });
              
        }
    }

  }

  advancedSearch(){
    this.searched_infos = []
      for(let e of this.card_infos){
        let nome = e.titulo + ''
        if(nome.includes(this.text_search)){
          this.searched_infos.push(e)
        }
    }
  }


  getPersonData(){
    this.person_data = []
    fetch('http://localhost:5000/pessoas?limit=200&offset=0').then(data=>{
      return data.json()
    }).then((result=>{
      console.log(result)
      this.person_data = result
    }))
  }

  getProjectData(){
    this.project_data = []
    fetch('http://localhost:5000/projetos?limit=200&offset=0').then(data=>{
      return data.json()
    }).then((result=>{
      console.log(result)
      this.project_data = result
    }))
  }

  removeRelationship(p: any){
    p.show = false
    this.deletarRelacoes.push(p.codigo)
  }


  clear(){
    this.name.setValue('')
    this.descricao.setValue('')
    this.formation.setValue('')
    this.experience.setValue('')
    this.tipo.setValue('')
    this.integrantes = []
    this.pesquisadores = []
    this.projeto = ''
  }

  closeEditModal(){
    this.editModal = false
  }

  editRegister(e : Event, person: any){
    e.stopPropagation()
    this.editModal = true
    this.selectedPerson = person
    console.log(this.selectedPerson)
    this.name.setValue(this.selectedPerson.titulo)
    this.descricao.setValue(this.selectedPerson.descricao)
    this.tipo.setValue(this.selectedPerson.tipo)

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
