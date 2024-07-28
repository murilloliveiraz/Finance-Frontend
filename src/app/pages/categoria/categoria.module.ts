import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria.component';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';



@NgModule(
    {
        providers: [],
        declarations: [CategoriaComponent],
        imports: [
            CommonModule,
            CategoriaRoutingModule,
            NavbarModule,
            SidebarModule,
            FormsModule,
            ReactiveFormsModule,
            NgSelectModule
        ]
    }
)

export class CategoriaModule { }
