import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
/**
 * Co 
 */
export class BackButtonComponent implements OnInit {

  @Input('url-padrao')
  urlPadrao = '/home';

  @Input('close')
  iconeClose = true

  /** Se um valor for setado, ele sempre vai voltar para esse caminho */
  @Input('fixo')
  fixo = null;

  constructor(private router:Router, private navController:NavController) { }

  ngOnInit() {}


  voltar() {
    if (this.fixo != null) 
      this.navController.navigateBack(this.fixo);
    else if (history.length > 0)
      this.navController.back();
    else
      this.navController.navigateForward(this.urlPadrao)
  }

}
