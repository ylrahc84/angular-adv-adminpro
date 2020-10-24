import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
 
    {
        path: 'dashboard', //Ruta por defecto
        component: PagesComponent,
        children:[
         { path: '', component: DashboardComponent}, //Path por Defecto al ingresar
         { path: 'progress', component: ProgressComponent},
         { path: 'grafica1', component: Grafica1Component},
         { path: 'account-settings', component: AccountSettingsComponent},
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