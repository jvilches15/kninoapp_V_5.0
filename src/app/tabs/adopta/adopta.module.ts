import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdoptaPageRoutingModule } from './adopta-routing.module';

import { AdoptaPage } from './adopta.page';

import { FechaRetiroPopoverComponent } from 'src/app/component/fecha-retiro-popover/fecha-retiro-popover.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdoptaPageRoutingModule
  ],
  declarations: [AdoptaPage, FechaRetiroPopoverComponent],
  
})
export class AdoptaPageModule {}
