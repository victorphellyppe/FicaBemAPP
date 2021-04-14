import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  public constructor(private plaform: Platform, private httpBrowser: HttpClient, private httpNativo:HTTP) { }

    /**
   * Realiza uma busca na API
   * @param url 
   */
  protected async get(url: string) {
    if (this.plaform.is('android') || this.plaform.is('ios'))
      return this.httpNativo.get(url, {}, {});
    else
      return this.httpBrowser.get(url).toPromise()
  }

  /**
   * Realiza um cadastro
   * @param url 
   * @param params 
   */
  protected async post(url: string, params: any = {}, headers:any = {}) {
    if (this.plaform.is('android') || this.plaform.is('ios'))
      return this.httpNativo.post(url, params, headers);
    else
      return this.httpBrowser.post(url, params, headers).toPromise()
  }

  /**
   * Realiza uma atualização
   * @param url 
   * @param params 
   */
  protected async put(url: string, params: any = {}, headers: any = {}) {
    if (this.plaform.is('android') || this.plaform.is('ios'))
      return this.httpNativo.put(url, params, headers);
    else
      return this.httpBrowser.put(url, params, headers).toPromise()
  }

  /**
   * Remove um dado na api
   * @param url 
   */
  protected async deleteput(url: string, params: any = {}, headers: any = {}) {
    if (this.plaform.is('android') || this.plaform.is('ios'))
      return this.httpNativo.delete(url, params, headers);
    else
      return this.httpBrowser.delete(url, headers).toPromise()
  }
}
