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

  
  closeMenu() {
    this.menu.close('mainMenu'); 
  }

 
  cerrarSesion() {
    console.log('Saliendo de K-Nino');
    
    
    localStorage.removeItem('isRegistered');  
    localStorage.removeItem('userData');     
   
    this.menu.close('mainMenu'); 

    
    this.router.navigate(['/login']);
  }
}
