import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Modulos
import { PageRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing.module';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

//Esto es un ARREGLO DE RUTAS
const routes: Routes = [

  //Rutas ya establecidas
  //path : '/dashboard' PageRoutingModule
  //path : '/auth' AuthRoutingModule
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}, //de esta manera establecemos la ruta por defecto
  { path: '**', component: NopagefoundComponent}, //Para manejar paginas que no se encuentren, paginas de Error

];

@NgModule({
  declarations: [],
  imports: [
    
    //forRoot para RUTAS PRINCIPALES
    RouterModule.forRoot(routes),
    PageRoutingModule, // Implementamos las Rutas HIJAS PARA "PAGES"
    AuthRoutingModule  // Implementamos las Rutas HIJAS PARA "AUTH"
    
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
