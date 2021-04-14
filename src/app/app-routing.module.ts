import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutentitcadoGuard } from './guards/autentitcado.guard';

const routes: Routes = [
  { path: '', redirectTo: 'inicial', pathMatch: 'full' },
  { path: 'inicial', loadChildren: './pages/inicial/inicial.module#InicialPageModule' },
  { path: 'bem-vindo', loadChildren: './pages/bem-vindo/bem-vindo.module#BemVindoPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule' },
  //Autenticado
  { path: '', canActivate:[AutentitcadoGuard], children: [
    { path: 'home',  redirectTo:'dashboard' },
    { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
    { path: 'encontre-ajuda', loadChildren: './pages/nos-encontre/nos-encontre.module#NosEncontrePageModule' },
    { path: 'violentometro', loadChildren: './pages/violentometro/violentometro.module#ViolentometroPageModule' },
    { path: 'quem-somos', loadChildren: './pages/quem-somos/quem-somos.module#QuemSomosPageModule' },
    { path: 'em-perigo', loadChildren: './pages/em-perigo/em-perigo.module#EmPerigoPageModule' },
    { path: 'comunidade', loadChildren: './pages/comunidade/comunidade.module#ComunidadePageModule' },
    { path: 'questionario', loadChildren: './pages/questionario/questionario.module#QuestionarioPageModule' },
  ]},
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
