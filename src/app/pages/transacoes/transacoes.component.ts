import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-transacoes',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    SidebarComponent,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  templateUrl: './transacoes.component.html',
  styleUrl: './transacoes.component.scss'
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
