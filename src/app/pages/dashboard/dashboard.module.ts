import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      { path: '', redirectTo: 'home' },
      { path: 'home', loadChildren: './home/home.module#HomePageModule' },
      { path: 'informacoes', loadChildren: './informacoes/informacoes.module#InformacoesPageModule' },
      { path: 'credito', loadChildren: './creditos/creditos.module#CreditosPageModule' },
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
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
