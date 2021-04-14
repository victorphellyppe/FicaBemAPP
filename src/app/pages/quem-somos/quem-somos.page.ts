import { Component, OnInit } from '@angular/core';
import { RavvsService } from 'src/app/services/ravvs.service';

@Component({
  selector: 'app-quem-somos',
  templateUrl: './quem-somos.page.html',
  styleUrls: ['./quem-somos.page.scss'],
})
export class QuemSomosPage implements OnInit {

  slides = [];

  constructor(private ravvsSrv: RavvsService) { }

  async ngOnInit() {
    this.slides = await this.ravvsSrv.buscarInformacoes();
  }

}
