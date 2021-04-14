import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { RavvsService } from 'src/app/services/ravvs.service';

@Component({
  selector: 'app-violentometro-modal',
  templateUrl: './violentometro-modal.component.html',
  styleUrls: ['./violentometro-modal.component.scss'],
})
export class ViolentometroModalComponent implements OnInit {

  @Input()
  resultado:{atencao:number, reaja:number, ajuda:number, total:number};

  status:string;

  contato: {telefone?:string, email?:string, endereco?:string} = {}

  constructor(public modalController: ModalController, private emailComposer: EmailComposer, private callNumber:CallNumber,
            private ravvsSrv:RavvsService) { }

  async ngOnInit() {
    if (this.resultado.ajuda > 0) this.status = 'ajuda';
    else if (this.resultado.reaja > 0) this.status = 'reaja';
    else if (this.resultado.atencao > 0) this.status = 'atencao';
    else this.status = 'seguro';

    this.contato = await this.ravvsSrv.contatoRAVVS();

  }


  /** Envia um email para contato */
  enviarEmail() {
    let email = {
      to: this.contato.email,
      subject: 'RAVVS Ajuda',
    }
  
    // Envia uma mensagem de texto
    this.emailComposer.open(email);
  }

  /** LIGA PARA A RAVVS */
  ligar() {
    this.contato.telefone = this.contato.telefone.replace('(', '').replace(')', '').replace('-', '');
    this.callNumber.callNumber(this.contato.telefone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  /** Fecha  o MODAL */
  fechar() {
    this.modalController.dismiss()
  }

}
