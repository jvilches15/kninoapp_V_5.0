import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { KninodbService } from '../service/kninodb.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController, 
    private alertController: AlertController,
    private kninodbService: KninodbService 
  ) { }

  ngOnInit() { }

 
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

  
  async login() {
    
    if (!this.email) {
      this.Alerta('Debe ingresar un correo electrónico.');
      return;
    }
  
    if (!this.validarEmail(this.email)) {
      this.Alerta('Debe ingresar un formato de correo válido.');
      return;
    }
  
    if (!this.password) {
      this.Alerta('Debe ingresar una contraseña.');
      return;
    }

    this.password = this.password.trim();
  
    if (this.password.length !== 4) {
      this.Alerta('La contraseña debe ser de exactamente 4 caracteres.');
      return;
    }
  
    const passwordRegex = /^[0-9]+$/;
    if (!passwordRegex.test(this.password)) {
      this.Alerta('La contraseña debe contener solo números.');
      return;
    }

    
    try {
      const usuarioId = await this.kninodbService.getUsuarioId(this.email);
      
      
      localStorage.setItem('usuarioId', usuarioId.toString());
      localStorage.setItem('isRegistered', 'true');
  
      
      this.navCtrl.navigateForward(['/home'], {
        queryParams: {
          email: this.email,
          password: this.password
        }
      });
    } catch (error) {
      
      this.Alerta('Error: Usuario no registrado. Por favor regístrate primero.');
      console.error(error);
    }
  }

 
  registrar() {
    this.navCtrl.navigateForward(['/registrar']);
  }
}
