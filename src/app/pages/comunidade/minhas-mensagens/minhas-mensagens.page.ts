import { Component, OnInit } from '@angular/core';
import { Personagem, Avatar } from 'src/app/components/btn-ajuda/personagem';
import { Duvida } from 'src/app/models/duvida';
import { DuvidasService } from 'src/app/services/duvidas.service';
import { Router } from '@angular/router';
import { NavExtrasService } from 'src/app/services/nav-extras.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-minhas-mensagens',
  templateUrl: './minhas-mensagens.page.html',
  styleUrls: ['./minhas-mensagens.page.scss'],
})
export class MinhasMensagensPage implements OnInit {

  ajuda = new Personagem('Aqui ficam as mensagens que você cria.\n\n\
                        Caso queira criar uma mensagem que pode ser lida e respondida por outros usuários cliquem no +', Avatar.COMUNIDADE);

  termo:string = '';
  //Lista com as duvidas
  duvidas: Duvida[] = []

  constructor(private duvidasSrv:DuvidasService, private router:Router, 
            private navExtra:NavExtrasService, private toastCtrl:ToastController) { }

  async ngOnInit() {
    this.duvidas = await this.duvidasSrv.minhasDuvidas();
  }

  /** Abre uma duvida existente */
  abrir(duvida: Duvida) {
    this.navExtra.set('duvida', duvida);
    this.router.navigateByUrl('/comunidade/mensagem');
  }

  /** Abre a tela de criação de nova dúvida */
  nova() {
    this.router.navigateByUrl('/comunidade/nova')
  }

  /** Remove uma duvida  */
  async remover(duvida: Duvida) {
    await this.duvidasSrv.remover(duvida.id);
    this.toastCtrl.create({message:'Removido com sucesso', duration: 2000}).then(t => t.present())
    this.duvidas = await this.duvidasSrv.minhasDuvidas();
  }

}
