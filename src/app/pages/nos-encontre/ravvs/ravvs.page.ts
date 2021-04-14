import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Platform } from '@ionic/angular';
import { RavvsService } from 'src/app/services/ravvs.service';

@Component({
  selector: 'app-ravvs',
  templateUrl: './ravvs.page.html',
  styleUrls: ['./ravvs.page.scss'],
})
export class RavvsPage implements OnInit {

  //Dados de acesso a RAVVS
  contato: {telefone?:string, email?:string, endereco?:string} = {}

  constructor(private emailComposer: EmailComposer, private callNumber:CallNumber,
           private ravvsSrv:RavvsService) { }

  async ngOnInit() {
    this.contato = await this.ravvsSrv.contatoRAVVS();
  }


  enviarEmail() {
    let email = {
      to: this.contato.email,
      subject: 'RAVVS Ajuda',
    }
    
    // Send a text message using default options
    this.emailComposer.open(email);
  }

  ligar() {
    this.contato.telefone = this.contato.telefone.replace('(', '').replace(')', '').replace('-', '');
    this.callNumber.callNumber(this.contato.telefone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  abrirMapa() {
      window.open('https://maps.google.com/?q='+this.contato.endereco)
  }

}
