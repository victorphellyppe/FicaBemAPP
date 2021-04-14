import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personagem, Avatar } from 'src/app/components/btn-ajuda/personagem';

@Component({
  selector: 'app-nos-encontre',
  templateUrl: './nos-encontre.page.html',
  styleUrls: ['./nos-encontre.page.scss'],
})
export class NosEncontrePage implements OnInit {

  ajuda = new Personagem('Aqui poderá encontrar como entrar em contato com a RAVVS ou grupos de apoio da nossa rede.', Avatar.ENCONTRE_AJUDA)

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /** Navega para uma oágina */
  navegar(url) { this.router.navigateByUrl(url) }

}
