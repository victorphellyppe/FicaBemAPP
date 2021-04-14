import { Component, OnInit } from '@angular/core';
import { Personagem, Avatar } from 'src/app/components/btn-ajuda/personagem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comunidade',
  templateUrl: './comunidade.page.html',
  styleUrls: ['./comunidade.page.scss'],
})
export class ComunidadePage implements OnInit {

  ajuda = new Personagem('Aqui, você pode ver as últimas dúvidas criada por outros usuários. Você também pode tirar a dúvida de alguns dele caso possa ajudar. Caso deseje pode usar barra de busca para trazer alguma outra dúvida com um termo específico', Avatar.COMUNIDADE);

  constructor(private router:Router) { }

  ngOnInit() {
  }

  /** Permite a navegação entre as páginas */
  navegar(url) { this.router.navigateByUrl(url) }

}
