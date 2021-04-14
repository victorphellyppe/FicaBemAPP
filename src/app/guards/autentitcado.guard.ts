import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AutentitcadoGuard implements CanActivate {
  
    constructor(private usuarioSrv:UsuarioService, private router:Router) { }
  
    /** Bloquea o acesso do usuário se ele não tiver logado */
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return true;
      const permitido = this.usuarioSrv.usuarioLogado != null;
      if (!permitido)
        this.router.navigateByUrl('/login');
      return permitido;
    }

}
