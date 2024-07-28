import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.scss']
})
export class TransacoesComponent {
  constructor(public menuService: MenuService, public formBuilder: FormBuilder) {
  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();


  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();

  transacoesForm: FormGroup;


  ngOnInit(){
    this.menuService.menuSelecionado = 4;

    this.transacoesForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]],
          valor: ['', [Validators.required]],
          data: ['', [Validators.required]],
          sistemaSelect: ['', [Validators.required]],
          categoriaSelect: ['', [Validators.required]],
        }
      )
  }

  dadorForm() {
    return this.transacoesForm.controls;
  }

  enviar() {
    debugger
    var dados = this.dadorForm();

    alert(dados["name"].value)
  }
}
