import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sistema',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    SidebarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './sistema.component.html',
  styleUrl: './sistema.component.scss'
})
export class SistemaComponent {
  constructor(public menuService: MenuService, public formBuilder: FormBuilder){}

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
    alert(dados["name"].value)
  }
}
