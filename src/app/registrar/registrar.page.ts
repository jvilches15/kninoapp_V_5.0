import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular'; 
import { MenuController } from '@ionic/angular'; 


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage {
  usuario = {
    nombre: '',
    apellido: '',
    username: '',
    password: '',
    direccion: '',
    fechaNac:'',
  };

  mascota = {
    nombre: '',
    raza: '',
    edad: ''
  };

  constructor(private navCtrl: NavController, private alertController: AlertController, private menu: MenuController) {}

  ngOnInit() {
    this.menu.close("mainMenu");
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: '¡¡Usuario K-Nino Registrado!!',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  openGoogleMaps() {
    const direccion = encodeURIComponent(this.usuario.direccion);
    const url = `https://www.google.com/maps/search/?api=1&query=${direccion}`;
    window.open(url, '_blank');
  }

  registrar() {
   
    if (this.usuario.nombre.trim() === '' || this.usuario.apellido.trim() === '' || this.usuario.username.trim() === '' || this.usuario.password.trim() === '' || this.usuario.direccion.trim() === '' || this.usuario.fechaNac.trim() === '') {
      this.presentAlert('Error: Datos vacios, debe completar todos los campos.');
    
      if(this.usuario.password.length > 4 || this.usuario.password.length < 4){

        this.presentAlert('La Password debe ser de 4 caracteres y no puede tener mas de 4 caracteres.');
        return;
    
      }
      const passwordRegex = /^[0-9]+$/;
    
      if(!passwordRegex.test(this.usuario.password)){
    
        this.presentAlert('La Password debe contener solo números.');
        return;
    
      }
    } else {
      this.presentAlert('Nombre:  '+this.usuario.nombre+' Apellido: '+this.usuario.apellido+' Fecha de Nacimiento: '+this.usuario.fechaNac); 
    }
  }

  limpiar(){
    
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.username = '';
    this.usuario.password = '';
    this.usuario.direccion = '';
    this.usuario.fechaNac = '';
    this.mascota.nombre = '';
    this.mascota.edad = '';
    this.mascota.raza = '';
    
    const userDiv = document.getElementById('user');
    if (userDiv) {
      userDiv.classList.add('animate');
      setTimeout(() => {
        userDiv.classList.remove('animate');
      }, 1000); 
    }


  }

  }



