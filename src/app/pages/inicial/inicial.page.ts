import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
})
export class InicialPage implements OnInit {

  constructor(private router: Router, private usuarioSrv:UsuarioService) { }

  async ngOnInit() {
    try {
      await this.usuarioSrv.initialize();
      setTimeout(() => {
          if (this.usuarioSrv.usuarioLogado != null)
            this.router.navigateByUrl('/home')
          else
            this.router.navigateByUrl('/bem-vindo'); 
      }, 3000)
    } catch (e) {
      this.router.navigateByUrl('/bem-vindo');
    }

  }

}
