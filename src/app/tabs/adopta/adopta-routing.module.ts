import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdoptaPage } from './adopta.page';

const routes: Routes = [
  {
    path: '',
    component: AdoptaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptaPageRoutingModule {}
