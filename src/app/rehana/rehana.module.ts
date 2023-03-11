import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RehanaPageRoutingModule } from './rehana-routing.module';

import { RehanaPage } from './rehana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RehanaPageRoutingModule
  ],
  declarations: [RehanaPage]
})
export class RehanaPageModule {}
