import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// ES6 Modules or TypeScript -- Para mensajes Personalizados
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {
  
  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre:['charly', [ Validators.required, Validators.minLength(3) ]],
    email:['test100@gmail.com', [ Validators.required, Validators.minLength(3), Validators.email ]],
    password:['123456',  Validators.required],
    password2:['123456',  Validators.required],
    terminos:[true,  Validators.required],
    role:['USER_ROLE'],
  },{
    validators: this.passwordIguales('password','password2')
  });

  constructor( private fb: FormBuilder,
               private UsuarioService: UsuarioService, 
               private router: Router  ) { }

  crearUsuario(){

    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if( this.registerForm.invalid ){
      return;
    }

    //Realizar el posteo
    this.UsuarioService.crearUsusario(this.registerForm.value)
    .subscribe( resp=>{
      
      //Mover al Dashboard
      this.router.navigateByUrl('/')

    }, (err)=> {
      //Si sucede un error-- la cadena de Error.msn viene desde Node
      Swal.fire('Error', err.error.msn, 'error');
    } );

  }

  campoNoValido( campo:string ):boolean{

    if( this.registerForm.get(campo).invalid && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  contrasenasNoValidas(){

    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    }else {
      return false;
    }

  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordIguales(pass1Name: string, pass2Name: string){

    return ( FormGroup: FormGroup ) =>{

      const pass1Control = FormGroup.get(pass1Name);
      const pass2Control = FormGroup.get(pass2Name);

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({ noEsIgual: true })
      }
    }

  }

}
