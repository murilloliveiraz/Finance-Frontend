import { SistemaService } from './../../services/Sistema.service';
import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiro';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent {
  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public sistemaService: SistemaService,
    public authService: AuthService
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
      .subscribe((response: any) => {
        this.sistemaForm.reset();
        console.log(response)
        this.sistemaService.CadastrarUsuarioNoSistema(response.result.id, this.authService.getEmailUser())
          .subscribe((response: any) => {
            console.log(this.authService.getEmailUser())
          }),
          (error) => console.error(error), () => {}
      }),
      (error) => console.error(error), () => {}

  }
}
