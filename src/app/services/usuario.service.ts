import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators'; // es un operador para disparar efecto secundario
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

const base_rul = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

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

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid || '' ;
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${base_rul}/login/renew`, {
      headers: {
        'x-token':this.token
      }
    }).pipe( 
      map( (resp: any) =>{

        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );

        localStorage.setItem('token', resp.token )

        return true;
      }),
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

  actualizarPerfil(data:{ email:string, nombre:string, role: string }){
  
    return this.http.put( `${base_rul}/usuarios/${this.uid}`, data,{
      headers: {
        'x-token':this.token
      }
    });
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



