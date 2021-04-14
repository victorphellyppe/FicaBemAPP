import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Permite passar os dados de uma página a outra
 * @author Carlos W. Gama
 */
export class NavExtrasService {

  private data:any[] = [];

  constructor() { }

  /**
   * Informa o valor
   * @param campo 
   * @param valor 
   */
  public set(campo:string, valor:any) {
    this.data[campo] = valor;
  }

  /**
   * Recupera o valor
   * @param campo 
   * @param padrao 
   * @param remove Remove o valor após recuperar
   */
  public get(campo:string, padrao:any = null, remove = true) {
    if (this.data[campo]) {
      let dado = this.data[campo];
      if (remove) this.data[campo] = null;
      return dado;
    } else 
      return padrao;
  }
}
