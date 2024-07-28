import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaComponent } from './sistema.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SistemaRoutingModule } from './sistema-routing.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';


@NgModule(
  {
      providers: [],
      declarations: [SistemaComponent],
      imports: [
          CommonModule,
          SistemaRoutingModule,
          NavbarModule,
          SidebarModule,
          ReactiveFormsModule
      ]
  }
)

export class SistemaModule { }
