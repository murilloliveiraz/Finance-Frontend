import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  constructor(public menuService: MenuService){}

  ngOnInit(){
    this.menuService.menuSelecionado = 3;
  }
}
