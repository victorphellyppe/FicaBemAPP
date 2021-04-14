import { Component, Input } from '@angular/core';
import { ToastController, Platform, ModalController } from '@ionic/angular';
import { Personagem } from 'src/app/components/btn-ajuda/personagem';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuarioLogado;
  web: boolean = false;

  
  constructor(public toastController: ToastController,private modalctr:ModalController, private usuarioSrv:UsuarioService, private platform: Platform, private router:Router) {
  }
  

  ionViewWillEnter() {
    this.web = window.location.href.indexOf("carloswgama") > -1 //Está numa versão web
    this.usuarioLogado = this.usuarioSrv.usuarioLogado;
    console.log(this.usuarioLogado);
  }

  /**
   * Mensagem temporaria das telas que ainda não fora criadas
   */
  implementar() {
    this.toastController.create({
      message: 'Tela ainda não criada',
      duration: 2000
    }).then(t => t.present())
  }
}