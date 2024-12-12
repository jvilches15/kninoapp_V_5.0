import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  email: string = '';
  password: string = '';
  bienvenidos: string = 'Bienvenid@';
  toastOpen: boolean = false;
  userFoto: string | null = '';

  premios = [
    {
      nombre: 'Burguer',
      mensaje: 'Canje por 3000 lenguetazos.',
      imagen: '/assets/img/premios/burguer.jpg',
    },
    {
      nombre: 'Jirafa',
      mensaje: 'Canje por 5000 lenguetazos.',
      imagen: '/assets/img/premios/jirafa.jpg',
    },
    {
      nombre: 'Patito',
      mensaje: 'Canje por 4000 lenguetazos.',
      imagen: '/assets/img/premios/patito.jpg',
    },
    {
      nombre: 'Pelotas',
      mensaje: 'Canje por 2000 lenguetazos.',
      imagen: '/assets/img/premios/pelotas.jpg',
    },
    {
      nombre: 'Set de Juguetes 01',
      mensaje: 'Canje por 8000 lenguetazos.',
      imagen: '/assets/img/premios/set.jpg',
    },
    {
      nombre: 'Set de Juguetes 02',
      mensaje: 'Canje por 8000 lenguetazos.',
      imagen: '/assets/img/premios/set01.jpg',
    },
    {
      nombre: 'Sogas para morder',
      mensaje: 'Canje por 5500 lenguetazos.',
      imagen: '/assets/img/premios/setsogas.jpg',
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    public toastController: ToastController, 
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.password = params['password'];
    });

    this.userFoto = localStorage.getItem('userFoto');
    console.log('Foto recuperada desde localStorage:', this.userFoto);

    this.menu.close("mainMenu");
  }

  async tomarFoto() {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      this.userFoto = image.dataUrl || '';  
      console.log('Foto tomada:', this.userFoto);

      localStorage.setItem('userFoto', this.userFoto);
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      this.userFoto = '';  
    }
  }
  
  async canjearLenguetazos(premioNombre: string) {
    const toast = await this.toastController.create({
      message: `${premioNombre} canjeado correctamente!`,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}




