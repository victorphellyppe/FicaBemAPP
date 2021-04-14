import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NosEncontrePage } from './nos-encontre.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: NosEncontrePage },
      { path: 'ravvs', loadChildren: './ravvs/ravvs.module#RavvsPageModule' },
      { path: 'apoio', loadChildren: './apoio/apoio.module#ApoioPageModule' }    ]
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
  declarations: [NosEncontrePage]
})
export class NosEncontrePageModule {}
