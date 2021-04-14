import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Personagem } from '../personagem';

@Component({
  selector: 'app-ajuda-modal',
  templateUrl: './ajuda-modal.component.html',
  styleUrls: ['./ajuda-modal.component.scss'],
})
/**
 * Abre o Modal
 */
export class AjudaModalComponent implements OnInit {

  @Input('personagem')
  personagem: Personagem;

  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  fechar() {
    this.modalController.dismiss()
  }

}
