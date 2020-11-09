import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir:File;
  public imgTem: any = '';


  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) { 
                
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      email:[this.usuario.email, [Validators.required, Validators.email]],
      role:['ROLE_USER', Validators.required],
    });

  }

  actualizarPerfil(){

    this.usuarioService.actualizarPerfil( this.perfilForm.value )
    .subscribe( resp=>{
      console.log(resp);
      const { nombre, email} = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado', 'Cambios fueron guardados', 'success' ); //Mensaje Cuadro

    }, (err)=>{

      Swal.fire('Error', err.error.msg, 'error'); //Mensaje Cuadro
      
    });

  }

  cambiarImagen( file:File ){
    
    this.imagenSubir = file;
    if(!file){
      return this.imgTem = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend =()=>{
      
      this.imgTem = reader.result;
    }

  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir,'usuarios', this.usuario.uid)
    .then(  img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizado', 'success'); //Mensaje Cuadro
      }).catch( err=>{
        Swal.fire('Error', 'No se pudo subir la imagen', 'error'); //Mensaje Cuadro
      })
  }

}
