import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { KninodbService } from '../service/kninodb.service'; // Asegúrate de importar el servicio

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
    private kninodbService: KninodbService // Inyectar el servicio
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

  // Función para iniciar sesión
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

    if (this.password.length > 4 || this.password.length < 4) {
      this.Alerta('La contraseña debe ser de exactamente 4 caracteres.');
      return;
    }

    const passwordRegex = /^[0-9]+$/;
    if (!passwordRegex.test(this.password)) {
      this.Alerta('La contraseña debe contener solo números.');
      return;
    }

    // Verificar si el email existe en la base de datos
    try {
      const usuarioId = await this.kninodbService.getUsuarioId(this.email); // Usamos email para buscar al usuario
      // Si el usuario existe, procedemos al login
      localStorage.setItem('usuarioId', usuarioId.toString()); // Guardamos el usuarioId en localStorage
      localStorage.setItem('isRegistered', 'true');
      // Ahora verificamos la contraseña (puedes agregar más lógica para verificar la contraseña si es necesario)
      // Si es correcto, navegamos a la página home
      this.navCtrl.navigateForward(['/home'], {
        queryParams: {
          email: this.email,
          password: this.password
        }
      });

    } catch (error) {
      // Si el email no está registrado, mostramos el mensaje de error
      this.Alerta('Error: Usuario no registrado. Por favor regístrate primero.');
      console.error(error);
    }
  }

  // Navegar a la página de registro
  registrar() {
    this.navCtrl.navigateForward(['/registrar']);
  }

}
