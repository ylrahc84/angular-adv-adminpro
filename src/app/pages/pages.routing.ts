import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
 
    {
        path: 'dashboard', //Ruta por defecto
        component: PagesComponent,
        canActivate:[ AuthGuard ],
        children:[
         { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}}, //Path por Defecto al ingresar
         { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
         { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica'}},
         { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Cuenta'}},
         { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
         { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}}
         //{ path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ] 
     },
];

@NgModule({
  declarations: [],
  //forChild(routes) para RUTAS HIJAS
  imports: [ RouterModule.forChild(routes)  ],
  exports: [ RouterModule]
})

export class PageRoutingModule { }