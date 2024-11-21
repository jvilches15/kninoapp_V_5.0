import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController, private router: Router) {}

  // Método para cerrar el menú
  closeMenu() {
    this.menu.close('mainMenu'); 
  }

  // Método para cerrar sesión completamente
  cerrarSesion() {
    console.log('Saliendo de K-Nino');
    
    // Eliminar todos los datos relacionados con el usuario en localStorage
    localStorage.removeItem('isRegistered');  // Eliminar estado de registro
    localStorage.removeItem('userData');      // Eliminar datos del usuario (si tienes alguno guardado)
    // Si tienes algún token de autenticación, también debes eliminarlo:
    // localStorage.removeItem('authToken');

    // Cerrar el menú
    this.menu.close('mainMenu'); 

    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
