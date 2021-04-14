import { Component, OnInit, ViewChild } from '@angular/core';
import { Duvida, Comentario } from 'src/app/models/duvida';
import { DuvidasService } from 'src/app/services/duvidas.service';
import { NavExtrasService } from 'src/app/services/nav-extras.service';
import { IonContent } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.page.html',
  styleUrls: ['./mensagem.page.scss'],
})
export class MensagemPage implements OnInit {

  duvida: Duvida = new Duvida();
  @ViewChild('ionContent', {static: true})
  ionContent: IonContent;

  mensagem: string = '';
  usuario: Usuario = null;
  
  constructor(private duvidaSrv:DuvidasService, 
              private usuarioSrv:UsuarioService,
              private navExtras:NavExtrasService, 
              private router:Router) {
    
  }

  ionViewWillEnter() {
    this.usuario = this.usuarioSrv.usuarioLogado;
    this.duvida = this.navExtras.get('duvida', null);
    if (this.duvida == null)
      this.router.navigateByUrl('/comunidade/mensagens');
    console.log(this.duvida);
  }

  ngOnInit() {
  }

  public async enviar() {
    let comentario = await this.duvidaSrv.responder(this.duvida, this.mensagem);
    this.duvida.comentarios.push(comentario);
    this.mensagem = '';
    this.ionContent.scrollToBottom(200);
  }

}
