import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RehanaPage } from './rehana.page';

const routes: Routes = [
  {
    path: '',
    component: RehanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RehanaPageRoutingModule {}
