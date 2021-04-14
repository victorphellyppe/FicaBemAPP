import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViolentometroModalComponent } from '../../components/violentometro-modal/violentometro-modal.component';
import { Personagem, Avatar } from 'src/app/components/btn-ajuda/personagem';

@Component({
  selector: 'app-violentometro',
  templateUrl: './violentometro.page.html',
  styleUrls: ['./violentometro.page.scss'],
})
export class ViolentometroPage implements OnInit {

  ajuda = new Personagem('Você sabia que nem toda violência é física? \n\
                          Por isso é comum muitas mulheres não saberem se são vítimas de violências. \n\n\
                          Você também possui essa dúvida? \n\
                          Marque as opções do questionário abaixo sobre sua relação com o parceiro, que iremos lhe informar se possui algum grau de violência',
                          Avatar.VIOLENTOMETRO)

  /** Resposta do questionário */
  resposta = {
    atencao: [false, false, false, false, false, false, false, false, false, false, false],
    reaja: [false, false, false, false, false, false, false, false],
    ajuda: [false, false, false, false, false, false, false]
  }

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  /**
   * Chama o Modal com a resposta sobre o abuso
   */ 
  async calcular() {
    let resultado = {
      atencao: this.resposta.atencao.reduce((acc, res) => (res ? acc+1 : acc), 0),
      reaja: this.resposta.reaja.reduce((acc, res) => (res ? acc+1 : acc), 0),
      ajuda: this.resposta.ajuda.reduce((acc, res) => (res ? acc+1 : acc), 0)
    }

    resultado['total'] = resultado.atencao + resultado.reaja + resultado.ajuda;

    this.modalController.create({
      component: ViolentometroModalComponent,
      componentProps: {resultado}
    }).then(m => m.present())
  }

}
