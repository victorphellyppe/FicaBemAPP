import { Component, OnInit } from '@angular/core';
import maps from 'src/config/maps';
import { Personagem, Avatar } from 'src/app/components/btn-ajuda/personagem';
import { RavvsService } from 'src/app/services/ravvs.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-apoio',
  templateUrl: './apoio.page.html',
  styleUrls: ['./apoio.page.scss'],
})
export class ApoioPage implements OnInit {

  ajuda = new Personagem('Olá, nessa tela, você pode conhecer outros parceiros da redes RAVVS.\n\n\
                        Também é possível clicar neles para abrir o mapa para a sua localização', Avatar.ENCONTRE_AJUDA)


  enderecosUSR:{endereco:string, descricao:string}[] = [];
  mapaUSR:string; //Mapa da Unidade de Saúde de Referência

  constructor(private ravvsSrv: RavvsService, private toastCtrl: ToastController) { }

  async ngOnInit() {
    
    this.enderecosUSR = await this.ravvsSrv.buscarUnidadesSaudeReferencia();
    
    //Monta Mapa das Unidades de Saude de Referência
    this.mapaUSR = 'https://maps.googleapis.com/maps/api/staticmap?&size=400x400';
    this.enderecosUSR.forEach((local, index) => {
      this.mapaUSR += `&markers=color:red|label:${index+1}|${local.endereco}`;
    })
    this.mapaUSR += '&key=' + maps.key;
    
  }

  abrirMapa(endereco) {
    window.open('https://maps.google.com/?q='+endereco);
  }

  mapa() {
    this.toastCtrl.create({
      message:'Clique em uma dos locais acima para abrir o mapa para ele',
      duration: 3000
    }).then(t => t.present())
  }
}
