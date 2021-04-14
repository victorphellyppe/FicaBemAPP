import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AjudaModalComponent } from './ajuda-modal/ajuda-modal.component';
import { Personagem } from './personagem';

@Component({
  selector: 'btn-ajuda',
  templateUrl: './btn-ajuda.component.html',
  styleUrls: ['./btn-ajuda.component.scss'],
})
/** 
 * Cria um botão para abrir o Modal de Ajuda 
 * @author Carlos W. Gama
 */
export class BtnAjudaComponent implements OnInit {


  @Input('auto-carregar')
  autoCarregar: boolean = false;

  @Input('personagem')
  personagem: Personagem;

  @Input('texto')
  texto: string = 'AJUDA';

  constructor(private modalController:ModalController) { }

  ngOnInit() {
    if(this.autoCarregar) this.abrir()
  }

  /** Abre o Modal */
  async abrir() {
    const modal = await this.modalController.create({
      component: AjudaModalComponent, 
      componentProps: {personagem: this.personagem}
    });
    modal.present();
  }

  ionViewDidLoad(){
    if (this.autoCarregar) this.abrir()
  }  
}




