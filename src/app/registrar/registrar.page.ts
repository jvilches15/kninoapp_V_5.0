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
  user = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    address: '',
    birthDate:'',
  };

  pet = {
    name: '',
    breed: '',
    age: ''
  };

  constructor(private navCtrl: NavController, private alertController: AlertController, private menu: MenuController) {}

  ngOnInit() {
    this.menu.close("mainMenu");
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  openGoogleMaps() {
    const address = encodeURIComponent(this.user.address);
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(url, '_blank');
  }

  registrar() {
   
    if (this.user.firstName.trim() === '' || this.user.lastName.trim() === '' || this.user.username.trim() === '' || this.user.password.trim() === '' || this.user.address.trim() === '' || this.user.birthDate.trim() === '') {
      this.presentAlert('Error: Datos vacios, debe completar todos los campos.');
    
      if(this.user.password.length > 4 || this.user.password.length < 4){

        this.presentAlert('La Password debe ser de 4 caracteres y no puede tener mas de 4 caracteres.');
        return;
    
      }
      const passwordRegex = /^[0-9]+$/;
    
      if(!passwordRegex.test(this.user.password)){
    
        this.presentAlert('La Password debe contener solo números.');
        return;
    
      }
    } else {
      this.presentAlert('Datos Correctos  nombre:  '+this.user.firstName+' apellido: '+this.user.lastName+' fecha de nacimiento: '+this.user.birthDate); 
    }
  }

  limpiar(){
    
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.username = '';
    this.user.password = '';
    this.user.address = '';
    this.user.birthDate = '';
    this.pet.name = '';
    this.pet.age = '';
    this.pet.breed = '';
    
    const userDiv = document.getElementById('user');
    if (userDiv) {
      userDiv.classList.add('animate');
      setTimeout(() => {
        userDiv.classList.remove('animate');
      }, 1000); 
    }


  }

  }



