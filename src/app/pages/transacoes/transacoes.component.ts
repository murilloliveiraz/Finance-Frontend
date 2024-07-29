import { TransacoesService } from './../../services/Transacoes.service';
import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';
import { AuthService } from 'src/app/services/auth.service';
import { SistemaService } from 'src/app/services/Sistema.service';
import { CategoriaService } from 'src/app/services/Categoria.service';
import { Transacao } from 'src/app/models/Transacao';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.scss']
})
export class TransacoesComponent {
  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public categoriaService: CategoriaService,
    public transacoesService: TransacoesService
  ) {
  }

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

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

    this.ListaCategoriasUsuario();
  }

  dadorForm() {
    return this.transacoesForm.controls;
  }

  handleChangePago(item: any){
    this.checked = item.checked as boolean;
  }

  enviar() {
    debugger
    var dados = this.dadorForm();

    let item = new Transacao();
    item.Name = dados["name"].value;
    item.Id = 0;
    item.Value = dados["valor"].value;
    item.DueDate = dados["data"].value;
    item.AlreadyPaid = this.checked;
    item.IdCategory = parseInt(this.categoriaSelect.id);

    this.transacoesService.AdicionarDespesa(item)
      .subscribe((response: Transacao) => {
        this.transacoesForm.reset();
      }),
      (error) => console.error(error), () => {}
  }

  ListaCategoriasUsuario() {
    this.categoriaService.ListarCategoriasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<any>) => {
        var listaCategoriasUsuario = [];

        response.forEach(x => {
          console.log(x);
          var item = new SelectModel();
          item.id = x.id.toString();
          item.name = x.name;

          listaCategoriasUsuario.push(item);
        });

        this.listCategorias = listaCategoriasUsuario;
      })
  }
}
