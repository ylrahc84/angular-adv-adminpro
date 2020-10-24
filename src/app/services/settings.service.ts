import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  //Aqui hace referencia al ID del index.html para el Thema principal
  private linkTheme = document.querySelector('#theme'); 

  constructor() { 

        //Con este proceso actualizamos el tema principal desde el almacenamiento del localstorage
        const url = localStorage.getItem('theme')  || "./assets/css/colors/default-dark.css";//Recuperar el thema del localStorage.
        this.linkTheme.setAttribute('href', url);
  }

  changeTheme( theme: string){
    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);//guardar en el LocalStorage.
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    
    const links = document.querySelectorAll('.selector'); 

    links.forEach (elem =>{
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnthemeUrl = `./assets/css/colors/${ btnTheme }.css`
      const currentTheme = this.linkTheme.getAttribute('href');

      if(btnthemeUrl === currentTheme){
        elem.classList.add('working');
      }

    })
  }
}
