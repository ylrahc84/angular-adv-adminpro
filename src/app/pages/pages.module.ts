import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ChartsModule } from 'ng2-charts';

//modulos
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PerfilComponent,
    PromesasComponent,
    RxjsComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule, //Es para usar propiedades como el Input y el Output en el Componente de "Progress" Es un tipo de Formulario
    ReactiveFormsModule, //Para Manejar Formularios Reactivos
    ChartsModule,
    SharedModule, //Importamos el MODULO DE "Shared"
    RouterModule, //Importamos las RUTAS 
    ComponentsModule //Importamos Componentes para el uso 
  ]
})

export class PagesModule { }
