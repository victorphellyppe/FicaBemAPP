import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmPerigoPage } from './em-perigo.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: EmPerigoPage},
      { path: 'contatos', loadChildren: './contatos/contatos.module#ContatosPageModule' },
      { path: 'novo-contato', loadChildren: './novo-contato/novo-contato.module#NovoContatoPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmPerigoPage]
})
export class EmPerigoPageModule {}
