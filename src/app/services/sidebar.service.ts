import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {


  menu: any[] = [
    {
            titulo: 'DashBoard',
            icono: 'mdi mdi-gauge',
            submenu:[
              {titulo: 'Main', url: '/'},
              {titulo: 'Grafica', url: 'grafica1'},
              {titulo: 'ProgressBar', url: 'progress'},
              {titulo: 'Promesas', url: 'promesas'},
              {titulo: 'RxJs', url: 'rxjs'},
            ]
    }
  ]



  constructor() { }
}
