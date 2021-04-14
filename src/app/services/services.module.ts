import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { HTTP } from '@ionic-native/http/ngx';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [CallNumber, Geolocation, SMS, HTTP]
})
export class ServicesModule { }
