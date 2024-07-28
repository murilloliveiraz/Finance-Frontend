import { SistemaService } from './../../services/Sistema.service';
import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiro';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent {
  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public sistemaService: SistemaService
  ){}

  sistemaForm: FormGroup;

  ngOnInit(){
    this.menuService.menuSelecionado = 2;

    this.sistemaForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]]
      }
    )
  }

  dadosForm(){
    return this.sistemaForm.controls;
  }

  enviar()
  {
    var dados = this.dadosForm();

    let item = new SistemaFinanceiro();
    item.Name = dados["name"].value;
    item.Id =0;
    item.Month=0;
    item.Year=0;
    item.Closingdate=0;
    item.GenerateExpensesCopy=true;
    item.CopyMonth=0;
    item.CopyYear=0;

    this.sistemaService.AdicionarSistemaFinanceiro(item)
      .subscribe((reponse: SistemaFinanceiro) => {
        this.sistemaForm.reset();

        this.sistemaService.CadastrarUsuarioNoSistema(reponse.Id, "murillo@gmail.com")
          .subscribe((response: any) => {
            debugger
          }),
          (error) => console.error(error), () => {}
      }),
      (error) => console.error(error), () => {}

  }
}
