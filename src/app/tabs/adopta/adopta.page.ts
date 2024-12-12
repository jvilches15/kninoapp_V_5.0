import { Component, AfterViewInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FechaRetiroPopoverComponent } from 'src/app/component/fecha-retiro-popover/fecha-retiro-popover.component';
import { PopoverController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
interface Adopcion {
  nombre: string;
  mensaje: string;
  imagen: string;
  adoptado: boolean;  
  fechaRetiro?: string;
}

@Component({
  selector: 'app-adopta',
  templateUrl: './adopta.page.html',
  styleUrls: ['./adopta.page.scss'],
})
export class AdoptaPage implements AfterViewInit {
  adoptame: Adopcion[] = [
    {
      nombre: 'Gigante',
      mensaje: 'Pequeño pero grande, muy cariñoso y querendon.',
      imagen: '/assets/img/perros/gigante.jpg',
      adoptado: false, 
    },
    {
      nombre: 'Gordo y Bachicha',
      mensaje: 'Porque adoptar uno, si te puedes llevar dos, son muy aventureros y traviesos.',
      imagen: '/assets/img/perros/gordoybachicha.jpg',
      adoptado: false,
    },
    {
      nombre: 'James',
      mensaje: 'James es muy educado y caballero, tranquilo por excelencia, un gran compañero.',
      imagen: '/assets/img/perros/james.jpg',
      adoptado: false,
    },
    {
      nombre: 'Pacifico',
      mensaje: 'Jugueton y alocado, las risas y momentos graciosos no faltaran con el.',
      imagen: '/assets/img/perros/pacifico.jpg',
      adoptado: false,
    },
    {
      nombre: 'Panky',
      mensaje: 'Gran amigo y mascota, compañero inseparable.',
      imagen: '/assets/img/perros/panky.jpg',
      adoptado: false,
    },
    {
      nombre: 'Rucia',
      mensaje: 'Tranquila y serena, buena para los paseos, le gusta la aventura.',
      imagen: '/assets/img/perros/rucia.jpg',
      adoptado: false,
    },
    {
      nombre: 'Tomaso',
      mensaje: 'Fiel amigo y muy conversador, sus ladridos son sin igual.',
      imagen: '/assets/img/perros/tomaso.jpg',
      adoptado: false,
    },
    {
      nombre: 'Wolfita',
      mensaje: 'Tierna e inocente, muy tranquila y serena, compañera fiel.',
      imagen: '/assets/img/perros/wolfito.jpg',
      adoptado: false,
    }
  ];

  
  ubicacion: string = '';
  map: any; 

  constructor(private alertController: AlertController, private popoverController: PopoverController) { }

  ngAfterViewInit() {

    this.initMap();
  }

  initMap() {
    const mapOptions = {
      center: { lat: 0, lng: 0 }, 
      zoom: 2, 
    };
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
  }

  async obtenerUbicacion() {
      try {
        const position = await Geolocation.getCurrentPosition();
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.ubicacion = `Lat: ${lat}, Lon: ${lon}`;
        this.mostrarMapa(lat, lon);
      } catch (error) {
        alert('Error al obtener la ubicación');
        console.error(error);
      }
    }
  
    
    mostrarMapa(lat: number, lon: number) {
      const position = { lat, lng: lon };
  
      this.map.setCenter(position);
      this.map.setZoom(15);
  
      new google.maps.Marker({
        position: position,
        map: this.map,
        title: 'Mi ubicación',
      });
    }


  async adoptar(adopta: Adopcion) {
    
    const popover = await this.popoverController.create({
      component: FechaRetiroPopoverComponent,
      cssClass: 'my-custom-class'
    });

    popover.onDidDismiss().then((data) => {
     
      if (data.data) {
        adopta.fechaRetiro = data.data;  
        adopta.adoptado = true;  
        this.confirmarAdopcion(adopta); 
      }
    });

    await popover.present();
  }

  
  async confirmarAdopcion(adopta: Adopcion) {
    const alert = await this.alertController.create({
      header: '¡Adopción Confirmada!',
      message: `El perrito/a ${adopta.nombre} ha sido adoptado con éxito. Fecha de retiro: ${adopta.fechaRetiro}.`,
      buttons: ['OK']
    });

    await alert.present();
  }
}