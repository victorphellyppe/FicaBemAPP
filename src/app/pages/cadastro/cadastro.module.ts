import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroPage } from './cadastro.page';
import { ComponentsModule } from 'src/app/components/components.module';
import {NgxMaskIonicModule} from 'ngx-mask-ionic'

const routes: Routes = [
  {
    path: '',
    component: CadastroPage
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
  declarations: [CadastroPage]
})
export class CadastroPageModule {}
