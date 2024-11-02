import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private alertController: AlertController ) { }

  ngOnInit() {
  }

  async Alerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  }
  login() {
    
    if (!this.email) {
     this.Alerta('Debe ingresar un correo electronico.');
     return;
   }

   
  if (!this.validarEmail(this.email)) {
    this.Alerta('Debe ingresar un formato de correo valido.');
    return;
  }

   
   if (!this.password) {
    this.Alerta('Debe ingresar una contraseña.');
    return;
  }

    
  if(this.password.length > 4 || this.password.length < 4){

    this.Alerta('La Password debe ser de 4 caracteres y no puede tener mas de 4 caracteres.');
    return;

  }
  const passwordRegex = /^[0-9]+$/;

  if(!passwordRegex.test(this.password)){

    this.Alerta('La Password debe contener solo números.');
    return;

  }

    
  this.navCtrl.navigateForward(['/home'], {
    queryParams: {
      email: this.email,
      password: this.password
    }
  });
 
}

registrar()
{
  this.navCtrl.navigateForward(['/registrar']);
}

}
