import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,


    children:[

      {
        path: 'alimento',
        loadChildren: () => import('./alimento/alimento.module').then( m => m.AlimentoPageModule)
      },

      {
        path: 'adiestramiento',
        loadChildren: () => import('./adiestramiento/adiestramiento.module').then( m => m.AdiestramientoPageModule)
      },
      {
        path: 'adopta',
        loadChildren: () => import('./adopta/adopta.module').then( m => m.AdoptaPageModule)
      },
      

      {
        path: '',
        redirectTo: 'tabs/alimento',
        pathMatch: 'full'

      }
    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
