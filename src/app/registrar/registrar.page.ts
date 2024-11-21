import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular'; 
import { MenuController } from '@ionic/angular'; 
import { KninodbService } from '../service/kninodb.service'; // Asegúrate de importar el servicio
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage {
  usuario = {
    nombre: '',
    apellido: '',
    email:  '',
    password: '',
    direccion: '',
    fechaNac: '',
  };

  mascota = {
    nombre: '',
    raza: '',
    edad: '',
    foto: '' as string | undefined
  };

  constructor(
    private navCtrl: NavController, 
    private alertController: AlertController, 
    private menu: MenuController,
    private kninodbService: KninodbService // Inyectar el servicio
  ) {}

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

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });
  
      // Aseguramos que la foto siempre sea una cadena, nunca undefined
      this.mascota.foto = image.base64String || ''; // Si base64String es undefined, asignamos una cadena vacía
      console.log('Foto tomada:', this.mascota.foto);
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      this.mascota.foto = '';  // En caso de error, podemos asegurar que la foto se establece como una cadena vacía
    }
  }

  // Registrar usuario y mascota en la base de datos
  async registrar() {
    // Validar campos vacíos
    if (this.usuario.nombre.trim() === '' || this.usuario.apellido.trim() === '' || this.usuario.email.trim() === '' || this.usuario.password.trim() === '' || this.usuario.direccion.trim() === '' || this.usuario.fechaNac.trim() === '') {
      this.presentAlert('Error: Datos vacíos, debe completar todos los campos.');
      return;
    }
 
    // Validar contraseña
    if (this.usuario.password.length !== 4) {
      this.presentAlert('La contraseña debe ser de exactamente 4 caracteres.');
      return;
    }

    // Validar que la contraseña contenga solo números
    const passwordRegex = /^[0-9]+$/;
    if (!passwordRegex.test(this.usuario.password)) {
      this.presentAlert('La contraseña debe contener solo números.');
      return;
    }

    // Insertar el usuario en la base de datos
    try {
      await this.kninodbService.insertUsuario(this.usuario); // Insertar el usuario

      // Obtener el ID del usuario recién insertado
      const usuarioId = await this.kninodbService.getUsuarioId(this.usuario.email); // Cambia por email o username, según como se maneje el ID
      this.presentAlert(`Usuario ${this.usuario.nombre} ${this.usuario.apellido} registrado correctamente.`);

      // Si se proporcionó una mascota, insertarla
      if (this.mascota.nombre.trim() !== '' && this.mascota.raza.trim() !== '' && this.mascota.edad.trim() !== '') {
        await this.kninodbService.insertMascota(this.mascota, usuarioId); // Insertar mascota
        this.presentAlert(`Mascota ${this.mascota.nombre} registrada correctamente.`);
      }

      // Guardar el estado de registro en localStorage para permitir acceso
      localStorage.setItem('isRegistered', 'true'); // Aquí guardas el estado de registro

    } catch (error) {
      this.presentAlert('Hubo un error al registrar el usuario o la mascota.');
      console.error(error);
    }

    // Limpiar los campos después de registrar
    this.limpiar();
  }

  limpiar() {
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.email = '';
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





