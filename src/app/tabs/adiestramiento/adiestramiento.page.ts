import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adiestramiento',
  templateUrl: './adiestramiento.page.html',
  styleUrls: ['./adiestramiento.page.scss'],
})
export class AdiestramientoPage implements OnInit {

  constructor() { }
  adiestras = [
    {
      nombre: 'Consejo N°1: Quieto',
      consejo: 'Ponte frente a tu perro y dile «QUIETO» mientras le enseñas la palma de tu mano abierta.Sin dejar de mirarle, da un par de pasos hacia detrás.Si no se ha movido, prémiale.',
      imagen: '/assets/img/adiestra/quieto.gif',
    },
    {
      nombre: 'Consejo N°2: Ven',
      consejo: 'Ponte frente a tu perro.Repite el ejercicio de «quieto».Cuando te hayas alejado, dile «VEN» mientras doblas la palma de tu mano hacia ti o abres tus brazos como si estuvieras esperando un abrazo.Cuando llegue, prémiale.',
      imagen: '/assets/img/adiestra/ven.gif',
    }, 
    {
      nombre: 'Consejo N°3: La Pata',
      consejo: 'Ponte frente a tu perro.Repite el ejercicio de «quieto».Acercate a el y extiende tu mano, con tu mano señala su pata.Si te da la pata, prémiale.',
      imagen: '/assets/img/adiestra/pata.gif',
    }, 
    {
      nombre: 'Consejo N°4: Tumba',
      consejo: 'Ponte frente a tu perro.Desde la posición de «sentado» dile «TUMBA» mientras mueves tu mano con un premio desde su hocico hacia el suelo.Si no se ha tumbado, prémiale.',
      imagen: '/assets/img/adiestra/tumba.gif',
    }, 

    {
      nombre: 'Consejo N°5: A la Cama',
      consejo: 'Ponte frente a tu perro.Dile «A LA CAMA» mientras le acompañas a su cama: condúcele con un premio en tu mano o con ayuda de la correa.Señálale con un dedo la cama.Cuando se tumbe, prémiale.',
      imagen: '/assets/img/adiestra/alacama.gif',
    },
    {
      nombre: 'Consejo N°6: Solo para Expertos: Salta la Cuerda',
      consejo: 'Ponte frente a tu perro.Prepara la cuerda y dale la orden de saltar cuando comiences.Si hace lo pedido y cuando finalicen, prémiale.',
      imagen: '/assets/img/adiestra/saltacuerda.gif',
    }
    
  ];


  ngOnInit() {
  }

}
