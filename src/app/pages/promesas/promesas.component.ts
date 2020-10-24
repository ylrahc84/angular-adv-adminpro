import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})

export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuario().then ( usuarios => {
      console.log(usuarios);
    } )

/*     const promesa = new Promise( (resolve, reject) => {

      if(false){
        resolve('Hola Mundo');
      }else{
        reject ('Algo salio Mal');
      }
    });

    promesa.then ( (mensaje) =>{
      console.log(mensaje);
    }).catch(error => console.log("Error en mi promesa", error));
      
    console.log('Fin de la promesa'); */
  }

  getUsuario(){

    const promesa = new Promise(resolve =>{

      fetch ('https://reqres.in/api/users')
      .then( resp => resp.json())
      .then (body => resolve(body.data));

    });
    
    return promesa;

  }
}
