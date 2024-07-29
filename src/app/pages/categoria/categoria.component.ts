import { CategoriaService } from './../../services/Categoria.service';
import { SistemaService } from './../../services/Sistema.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { Categoria } from 'src/app/models/Categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public sistemaService: SistemaService,
    public categoriaService: CategoriaService
  ) {
  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  categoriaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 3;

    this.categoriaForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]],
          sistemaSelect: ['', Validators.required]
        }
      )

      this.ListaSistemasUsuario()
  }


  dadosForm() {
    return this.categoriaForm.controls;
  }

  enviar() {
    var dados = this.dadosForm();

    let item = new Categoria();
    item.Name = dados["name"].value;
    item.Id = 0;
    item.IdSystem = parseInt(this.sistemaSelect.id);

    this.categoriaService.AdicionarCategoria(item)
      .subscribe((response: Categoria) => {
        this.categoriaForm.reset();
      }),
      (error) => console.error(error), () => {}
  }

  ListaSistemasUsuario() {
    this.sistemaService.ListaSistemasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<any>) => {
        var listaSistemaFinanceiro = [];

        response.forEach(x => {
          console.log(x);
          var item = new SelectModel();
          item.id = x.id.toString();
          item.name = x.name;

          listaSistemaFinanceiro.push(item);
        });

        this.listSistemas = listaSistemaFinanceiro;
      })
  }
}
