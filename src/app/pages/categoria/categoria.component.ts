import { SistemaService } from './../../services/Sistema.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

  constructor(public menuService: MenuService, public formBuilder: FormBuilder, public authService: AuthService, public sistemaService: SistemaService) {
  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  categoriaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 3;

    this.categoriaForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]]
        }
      )

      this.ListaSistemasUsuario()
  }


  dadosForm() {
    return this.categoriaForm.controls;
  }

  enviar() {
    debugger
    var dados = this.dadosForm();

    alert(dados["name"].value)
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
