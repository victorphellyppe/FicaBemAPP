import { Component, OnInit } from '@angular/core';
import { Personagem, Avatar } from 'src/app/components/btn-ajuda/personagem';
import { AlertController, ToastController } from '@ionic/angular';
import { Contato } from 'src/app/models/contato';
import { RavvsService } from 'src/app/services/ravvs.service';
import { ContatosService } from 'src/app/services/contatos.service';

@Component({
  selector: 'app-em-perigo',
  templateUrl: './em-perigo.page.html',
  styleUrls: ['./em-perigo.page.scss'],
})
export class EmPerigoPage implements OnInit {

  ajuda = new Personagem('Caso esteja em perigo, pode usar os botões abaixo para solicitar ajuda rápido!\n\
                        Mas não aperte caso não esteja. Use com sabedoria!\n\
                        Os botões abaixo servem para:\n\
                        - Polícia - Liga para a polícia\n\
                        - RAVVS - Liga para a equipe da RAVVS \n\
                        - SMS RAVVS - Envia um SMS para RAVVS solicitando ajuda \n\n\
                        - SMS Contatos - Envia um SMS para todos seus contatos cadastrados, solicitando ajuda \n\n\
                        - ENVIAR SMS PARA TODOS - Envia um SMS para todos seus contatos cadastrados e para RAVVS, solicitando ajuda \n\n',
                        Avatar.EM_PERIGO)

  private readonly TELEFONE_POLICIA = '190';
  private TELEFONE_RAVVS;
  private contatos: Contato[];

  constructor(private contatosSrv:ContatosService, private alertController: AlertController, private toastController:ToastController,
              private ravvsSrv:RavvsService) { }

  async ngOnInit() {
    const ravvs = await this.ravvsSrv.contatoRAVVS();
    this.TELEFONE_RAVVS = ravvs.telefone;
    this.contatos = await this.contatosSrv.buscar();
  }

  async ionViewWillEnter() {
    this.contatos = await this.contatosSrv.buscar();
  }
  
  //==================================== BOTÕES ==============================//

  /** Solicita uma ligação para a polícia - BOTÃO POLICIA */
  public ligarPolicia() { 
    this.ligar('Polícia', this.TELEFONE_POLICIA)
  }

  /** Solicita uma ligação para a RAVVS - BOTÃO RAVVS */
  public ligarRAVVS() { 
    this.ligar('RAVVS', this.TELEFONE_RAVVS)
  }

  /** Solicita o envio de SMS para a RAVVS - BOTÃO SMS - RAVVS */
  public enviarSMSRAVVS() { 
    this.alertController.create({
      header:'Enviar SMS',
      message: 'Deseja realmente enviar um SMS de ajuda para a RAVVS com sua localização?',
      buttons: ['Cancelar', {text: 'Enviar', handler:() => this.contatosSrv.enviarSMS(this.TELEFONE_RAVVS).then(sucesso => this.msgSMS(true)) }]
    }).then(a => a.present())
  }

  /** Solicita o envio de SMS para a Contatos - BOTÃO SMS - CONTATOS */
  public enviarSMSContatos() { 
    this.alertController.create({
      header:'Enviar SMS',
      message: 'Deseja realmente enviar um SMS de ajuda para os seus contatos com sua localização?',
      buttons: ['Cancelar', {text: 'Enviar', handler:() => {
          const telefones = [];
          this.contatos.forEach(c => {
          if (c.ativo)
            telefones.push(c.telefone);
        })
          if (telefones.length > 0)
            this.contatosSrv.enviarSMS(telefones).then(sucesso => this.msgSMS(true))
          else
            this.toastController.create({message: 'Não há contatos para enviar sms', duration: 3000}).then(t => t.present())
      }}]
    }).then(a => a.present())
  }

  /**
   * Envia um SMS para a RAVVS e todos os contatos com sua localização - BOTÃO - ENVIAR SMS PARA TODOS
   */ 
  public enviarSMSTodos() {
    this.alertController.create({
      header:'Solicitar ajuda',
      message: 'Enviar SMS pedindo ajuda a RAVVS e contatos com sua localização',
      buttons: [
        'Cancelar',
        {text: 'Enviar', handler:() => {
          const telefones = [];
          //RAVVS
          telefones.push(this.TELEFONE_RAVVS);
          //CONTATOS
          this.contatos.forEach(c => {
            if (c.ativo) telefones.push(c.telefone);
          });       
          this.contatosSrv.enviarSMS(telefones).then(sucesso => this.msgSMS(true));
        }
      }
      ]
    }).then(a => a.present())
  }

  //================================ FUNÇÕES UTEIS ===============================//
  /** Realiza uma ligação para o telefone informado */
  private ligar(destino: string, telefone: string) {
    this.alertController.create({
      header:'Ligar',
      message: 'Deseja realmente ligar para ' + destino + '?',
      buttons: ['Cancelar', {text: 'Ligar', handler:() => this.contatosSrv.ligar(telefone) }]
    }).then(a => a.present())
  }

  private msgSMS(sucesso: boolean) {
    let msg = (sucesso ? 'Seu pedido foi enviado com sucesso. Aguarde o resgate com calma' : 'Não foi possivel enviar o pedido de socorro');
    this.toastController.create({
      message: msg,
      duration: 3000
    }).then(t => t.present())
  }

}
