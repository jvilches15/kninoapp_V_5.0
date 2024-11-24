import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { KninodbService } from '../service/kninodb.service';

import { Geolocation } from '@capacitor/geolocation';
declare var google: any;

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements AfterViewInit {
  usuario = {
    nombre: '',
    apellido: '',
    email: '',
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

  direccionInput: string = ''; 
  ubicacion: string = '';
  suggestions: any[] = []; 
  map: any; 

  constructor(
    private navCtrl: NavController, 
    private alertController: AlertController, 
    private menu: MenuController,
    private kninodbService: KninodbService
  ) {}

  ngAfterViewInit() {
    this.initMap();
    this.initAutocomplete(); 
  }

  initMap() {
    const mapOptions = {
      center: { lat: 0, lng: 0 }, 
      zoom: 2, 
    };
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
  }

  initAutocomplete() {
    const input = document.getElementById('address-input') as HTMLInputElement;
    const options = {
      types: ['address'],
      componentRestrictions: { country: 'CL' }, 
    };

    const autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        this.direccionInput = place.formatted_address;
        this.usuario.direccion = place.formatted_address;
      }
    });
  }

  
  onInputChange(event: any) {
    const input = event.target.value;

    if (input.length > 0) {
      this.getSuggestions(input);
    } else {
      this.suggestions = []; 
    }
  }

  
  getSuggestions(query: string) {
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: query }, (predictions: google.maps.places.AutocompletePrediction[], status: google.maps.places.PlacesServiceStatus) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.suggestions = predictions;
      } else {
        this.suggestions = [];
      }
    });
  }

  
  selectAddress(suggestion: any) {
    this.direccionInput = suggestion.description;
    this.usuario.direccion = suggestion.description;
    this.suggestions = []; 
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

  
  

  async registrar() {
    if (this.usuario.nombre.trim() === '' || this.usuario.apellido.trim() === '' || this.usuario.email.trim() === '' || this.usuario.password.trim() === '' || this.usuario.direccion.trim() === '' || this.usuario.fechaNac.trim() === '') {
      this.presentAlert('Error: Datos vacíos, debe completar todos los campos.');
      return;
    }

    if (this.usuario.password.length !== 4) {
      this.presentAlert('La contraseña debe ser de exactamente 4 caracteres.');
      return;
    }

    const passwordRegex = /^[0-9]+$/;
    if (!passwordRegex.test(this.usuario.password)) {
      this.presentAlert('La contraseña debe contener solo números.');
      return;
    }

    try {
      await this.kninodbService.insertUsuario(this.usuario); 

      const usuarioId = await this.kninodbService.getUsuarioId(this.usuario.email); 
      this.presentAlert(`Usuario ${this.usuario.nombre} ${this.usuario.apellido} registrado correctamente.`);

      if (this.mascota.nombre.trim() !== '' && this.mascota.raza.trim() !== '' && this.mascota.edad.trim() !== '') {
        await this.kninodbService.insertMascota(this.mascota, usuarioId); 
        this.presentAlert(`Mascota ${this.mascota.nombre} registrada correctamente.`);
      }

      localStorage.setItem('isRegistered', 'true');
    } catch (error) {
      this.presentAlert('Hubo un error al registrar el usuario o la mascota.');
      console.error(error);
    }

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

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Información de Registro',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}






