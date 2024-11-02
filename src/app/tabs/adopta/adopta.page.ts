import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Adopcion {
  nombre: string;
  mensaje: string;
  imagen: string;
}

@Component({
  selector: 'app-adopta',
  templateUrl: './adopta.page.html',
  styleUrls: ['./adopta.page.scss'],
})
export class AdoptaPage implements OnInit {
  adoptame: Adopcion[] = [
    {
      nombre: 'Gigante',
      mensaje: 'Pequeño pero grande, muy cariñoso y querendon.',
      imagen: '/assets/img/perros/gigante.jpg',
    },
    {
      nombre: 'Gordo y Bachicha',
      mensaje: 'Porque adoptar uno, si te puedes llevar dos, son muy aventureros y traviesos.',
      imagen: '/assets/img/perros/gordoybachicha.jpg',
    },
    {
      nombre: 'James',
      mensaje: 'James es muy educado y caballero, tranquilo por excelencia, un gran compañero.',
      imagen: '/assets/img/perros/james.jpg',
    },
    {
      nombre: 'Pacifico',
      mensaje: 'Jugueton y alocado, las risas y momentos graciosos no faltaran con el.',
      imagen: '/assets/img/perros/pacifico.jpg',
    },
    {
      nombre: 'Panky',
      mensaje: 'Gran amigo y mascota, compañero inseparable.',
      imagen: '/assets/img/perros/panky.jpg',
    },
    {
      nombre: 'Rucia',
      mensaje: 'Tranquila y serena, buena para los paseos, le gusta la aventura.',
      imagen: '/assets/img/perros/rucia.jpg',
    },
    {
      nombre: 'Tomaso',
      mensaje: 'Fiel amigo y muy conversador, sus ladridos son sin igual.',
      imagen: '/assets/img/perros/tomaso.jpg',
    },
    {
      nombre: 'Wolfita',
      mensaje: 'Tierna e inocente, muy tranquila y serena, compañera fiel.',
      imagen: '/assets/img/perros/wolfito.jpg',
    }
  ];

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  async adoptar(adopta: Adopcion) { // Especificamos el tipo de 'adopta'
    const alert = await this.alertController.create({
      header: '¡Éxito!',
      message: `Perrito/a ${adopta.nombre} adoptado.`,
      buttons: ['OK']
    });

    await alert.present();
  }
}

