import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViolentometroModalComponent } from './violentometro-modal/violentometro-modal.component';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { BtnAjudaComponent } from './btn-ajuda/btn-ajuda.component';
import { AjudaModalComponent } from './btn-ajuda/ajuda-modal/ajuda-modal.component';
import { BackButtonComponent } from './back-button/back-button.component';


@NgModule({
  declarations: [ViolentometroModalComponent, BtnAjudaComponent, AjudaModalComponent, BackButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [EmailComposer, CallNumber],
  entryComponents: [ViolentometroModalComponent, BtnAjudaComponent, AjudaModalComponent, BackButtonComponent],
  exports: [BtnAjudaComponent, BackButtonComponent]
})
export class ComponentsModule { }
