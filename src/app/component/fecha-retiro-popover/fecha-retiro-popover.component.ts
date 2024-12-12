import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-fecha-retiro-popover',
  templateUrl: './fecha-retiro-popover.component.html',
  styleUrls: ['./fecha-retiro-popover.component.scss'],
})
export class FechaRetiroPopoverComponent {
  fechaSeleccionada: string ='';

  constructor(private popoverController: PopoverController) {}

  cerrarPopover() {
    this.popoverController.dismiss();
  }

  confirmarFecha() {
    this.popoverController.dismiss(this.fechaSeleccionada); 
  }
}
