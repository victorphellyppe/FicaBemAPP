import { Component, OnInit } from '@angular/core';
import { Personagem, Avatar } from 'src/app/components/btn-ajuda/personagem';
import { Duvida } from 'src/app/models/duvida';
import { DuvidasService } from 'src/app/services/duvidas.service';
import { Router } from '@angular/router';
import { NavExtrasService } from 'src/app/services/nav-extras.service';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
})
export class MensagensPage implements OnInit {

  ajuda = new Personagem('Aqui, você pode ver as últimas dúvidas criada por outros usuários.\n\n\
                        Você também pode tirar a dúvida de alguns deles caso possa ajudar\n\n\
                        Caso deseje pode usar barra de busca para trazer alguma outra duvida com um termo específico', Avatar.COMUNIDADE);

  //Termo pra busca
  termo: string = '';
              
  //Lista com as duvidas
  duvidas: Duvida[] = []

  constructor(private duvidasSrv:DuvidasService, private router:Router, private navExtra:NavExtrasService) { }

  async ngOnInit() {
    this.duvidas = await this.duvidasSrv.ultimos();
    console.log(this.duvidas);
  }

  /** Atualiza conteudos */
  async doRefresh(event) {
    await this.buscar();
    event.target.complete();
  }

  /** Realiza a busca */
  async buscar() {
    console.log(this.termo);
    if (this.termo) this.duvidas = await this.duvidasSrv.buscar(this.termo);
    else this.duvidas = await this.duvidasSrv.ultimos();
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

}
