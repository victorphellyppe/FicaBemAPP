import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovoContatoPage } from './novo-contato.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';

const routes: Routes = [
  {
    path: '',
    component: NovoContatoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxMaskIonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovoContatoPage]
})
export class NovoContatoPageModule {}
