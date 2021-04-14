import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComunidadePage } from './comunidade.page';
import { AutentitcadoGuard } from 'src/app/guards/autentitcado.guard';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ComunidadePage },
      { path: 'mensagens', loadChildren: './mensagens/mensagens.module#MensagensPageModule' },
      { path: 'minhas-mensagens', loadChildren: './minhas-mensagens/minhas-mensagens.module#MinhasMensagensPageModule' },
      { path: 'mensagem', loadChildren: './mensagem/mensagem.module#MensagemPageModule' },
      { path: 'nova', loadChildren: './nova-mensagem/nova-mensagem.module#NovaMensagemPageModule', canActivate: [AutentitcadoGuard] }

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
  declarations: [ComunidadePage]
})
export class ComunidadePageModule {}
