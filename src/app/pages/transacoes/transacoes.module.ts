import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { TransacoesComponent } from './transacoes.component';
import { TransacoesRoutingModule } from './transacoes-routing.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule(
    {
        providers: [],
        declarations: [TransacoesComponent],
        imports: [
            CommonModule,
            TransacoesRoutingModule,
            NavbarModule,
            SidebarModule,
            FormsModule,
            ReactiveFormsModule,
            NgSelectModule,
            MatSlideToggleModule
        ],
    }
)

export class TransacoesModule { }
