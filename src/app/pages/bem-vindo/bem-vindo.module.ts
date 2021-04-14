import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BemVindoPage } from './bem-vindo.page';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BemVindoPage },
      { path: 'secoes', loadChildren: './secoes/secoes.module#SecoesPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BemVindoPage]
})
export class BemVindoPageModule {}
