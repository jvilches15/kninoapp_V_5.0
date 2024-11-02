import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  email: string = '';
  password: string = '';
  bienvenidos: string='Bienvenid@';

  constructor(private route: ActivatedRoute, ) {}
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


  ngOnInit() { 
    
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.password = params['password'];
    });
  }

}
