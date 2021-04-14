import { Component, OnInit } from '@angular/core';
import { ContatosService } from 'src/app/services/contatos.service';
import { Contato } from 'src/app/models/contato';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage implements OnInit {

  contatos: Contato[] = [];

  constructor(private contatosSrv:ContatosService, private toastCtrl:ToastController,
      private alertCtrl:AlertController) { }

  async ngOnInit() {
    this.contatos = await this.contatosSrv.buscar();
  }
  
  async ionViewWillEnter() {
    this.contatos = await this.contatosSrv.buscar();
  }

  /** Remove um contato */
  async remover(contato: Contato) {
    console.log('remover', contato);
    this.alertCtrl.create({
      header: `Remover contato`,
      subHeader:  `${contato.nome} (${contato.telefone})`,
      buttons: [
        'Cancelar',
        {text: 'Confirmar', handler: async () => {
          const resposta = await this.contatosSrv.remover(contato.id);
          if (resposta.sucesso) {
            this.toastCtrl.create({message:'Removido com sucesso', duration: 3000}).then(t => t.present())
            this.contatos = await this.contatosSrv.buscar();
          } else {
            this.toastCtrl.create({message:'Houve uma falha ao remover contato', duration: 3000}).then(t => t.present())
          }
        }}
      ]
    }).then(a => a.present());
  }
  
  /** Altera o Status de um Contato */
  async alterar(contato: Contato) {
    contato.ativo = !contato.ativo;
    const resposta = await this.contatosSrv.ativar(contato);
    if (!resposta.sucesso) 
      this.toastCtrl.create({message:'Houve uma falha ao remover contato', duration: 3000}).then(t => t.present())
  

  }

}
