import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-transacoes',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './transacoes.component.html',
  styleUrl: './transacoes.component.scss'
})
export class TransacoesComponent {
  constructor(public menuService: MenuService){}

  ngOnInit(){
    this.menuService.menuSelecionado = 4;
  }
}
