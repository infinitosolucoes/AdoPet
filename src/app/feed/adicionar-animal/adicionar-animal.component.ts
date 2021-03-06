import { SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../../model/Animal';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-adicionar-animal',
  templateUrl: './adicionar-animal.component.html',
  styleUrls: ['./adicionar-animal.component.css']
})
export class AdicionarAnimalComponent implements OnInit {
  animal: Animal;
  msgs: Message[];
  tipoDeAnimal: SelectItem[];
  idade: SelectItem[];
  sexo: SelectItem[];
  porte: SelectItem[];

  constructor(private animalService: AnimalService, private route: Router) { 
    this.animal = {nome:" ", tipo: " ", sexo: " ", cor: " ", idade: "", porte: " ", descricao: " "};
    this.msgs = [];  
    this.tipoDeAnimal = [
      {label: 'Selecione', value: null},
      {label: 'Cachorro', value: 'Cachorro'},
      {label: 'Gato', value: 'Gato'},
    ];
    this.idade = [
      {label: 'Selecione', value: null},
      {label: 'Filhote', value: 'Filhote'},
      {label: 'Adulto', value: 'Adulto'},
    ];
    this.sexo = [
      {label: 'Selecione', value: null},
      {label: 'Fêmea', value: 'Femea'},
      {label: 'Macho', value: 'Macho'},
    ];
    this.porte = [
      {label: 'Selecione', value: null},
      {label: 'Pequeno', value: 'Pequeno'},
      {label: 'Médio', value: 'Médio'},
      {label: 'Grande', value: 'Grande'},
    ]
  }
  ngOnInit() {}

  salvar(){
    if(this.animal.nome == "" || this.animal.tipo == "" || this.animal.sexo == "" || this.animal.cor == "" || this.animal.idade == "" || this.animal.descricao == ""){
      this.showError() 
    }else{
      this.animalService.salvar(this.animal).then(() => {
        this.showSuccess()
        this.route.navigate(['feed/listar-animais']);
      }).catch(error => {        
        console.log(error)
        this.showError()
      })
    }
  }
  showError() {
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'Erro', detail:'Preencha os dados corretamente.'});
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Animal adicionado com sucesso!'});
  }
}