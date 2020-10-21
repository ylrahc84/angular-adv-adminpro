import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Modulos
import { PageRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing.module';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [

  //Rutas ya establecidas
  //path : '/dashboard' PageRoutingModule
  //path : '/auth' AuthRoutingModule
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}, //de esta manera establecemos la ruta por defecto
  { path: '**', component: NopagefoundComponent},

];

@NgModule({
  declarations: [],
  imports: [

    RouterModule.forRoot(routes),
    PageRoutingModule,
    AuthRoutingModule
    
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
