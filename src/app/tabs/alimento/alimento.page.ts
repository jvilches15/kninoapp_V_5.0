import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'; 

@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.page.html',
  styleUrls: ['./alimento.page.scss'],
})
export class AlimentoPage implements OnInit {

  constructor(private menu: MenuController) { }

  alimentos = [
    {
      nombre: 'Alfa Dog',
      precio: '$30.000',
      lenguetazo: 'Acumulas 40 lenguetazos',
      imagen: '/assets/img/alimentos/alfa.jpg'
    },
    {
      nombre: 'Charly',
      precio: '$35.000',
      lenguetazo: 'Acumulas 45 lenguetazos',
      imagen: '/assets/img/alimentos/charly.jpg'
    },
    {
      nombre: 'DogPlus',
      precio: '$40.000',
      lenguetazo: 'Acumulas 50 lenguetazos',
      imagen: '/assets/img/alimentos/dogplus.jpg'
    },
    {
      nombre: 'Master Dog',
      precio: '$25.000',
      lenguetazo: 'Acumulas 25 lenguetazos',
      imagen: '/assets/img/alimentos/masterdog.jpg'
    },
    {
      nombre: 'Pedigree',
      precio: '$30.000',
      lenguetazo: 'Acumulas 40 lenguetazos',
      imagen: '/assets/img/alimentos/pedigree.jpg'
    },
    {
      nombre: 'Voller',
      precio: '$50.000',
      lenguetazo: 'Acumulas 55 lenguetazos',
      imagen: '/assets/img/alimentos/voller.jpg'
    },
    {
      nombre: 'Fit Formula',
      precio: '$40.000',
      lenguetazo: 'Acumulas 50 lenguetazos',
      imagen: '/assets/img/alimentos/fit.jpg'
    }
   
  ];

  ngOnInit() {
    this.menu.close('mainMenu');
  }

}
