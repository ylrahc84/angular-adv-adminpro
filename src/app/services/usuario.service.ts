import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators'; // es un operador para disparar efecto secundario
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { resolve } from 'dns';


const base_rul = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {

  public auth2:any;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone
    ) { 
      this.googleInit();
    }

  googleInit(){
    //las promesas siempre se van a ver
    return new Promise( resolve =>{

      gapi.load('auth2', () => {
          
        this.auth2 = gapi.auth2.init({
          client_id: '631579702609-q6n1nni6sklb44bni6bgcrotsua9p9ui.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });

        resolve();
        
      });

    })
  }


  logout(){
    localStorage.removeItem('token');
    
    this.auth2.signOut().then( ()=> {
      
      this.ngZone.run( ()=>{
        this.router.navigateByUrl('/login')
      })
      
    });
  }

  validarToken(): Observable<boolean>{

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_rul}/login/renew`, {
      headers: {
        'x-token':token
      }
    }).pipe( 
      tap( (resp: any) =>{
        localStorage.setItem('token', resp.token )
      }),
      map( resp => true),
      catchError( error=> of(false) )
     );
  }

  crearUsusario( formData: RegisterForm ){

    return this.http.post( `${base_rul}/usuarios`, formData )
    .pipe(
      tap( (resp:any)=>{
        localStorage.setItem('token', resp.token)
      })
    );
    
  }


  login (formData: LoginForm){

    return this.http.post( `${base_rul}/login`, formData )
    .pipe(
      tap( (resp:any)=>{
        localStorage.setItem('token', resp.token)
      })
    );
  }

  loginGoogle (token){

    return this.http.post( `${base_rul}/login/google`, {token} )
    .pipe(
      tap( (resp:any)=>{
        localStorage.setItem('token', resp.token)
      })
    );
  }

}



