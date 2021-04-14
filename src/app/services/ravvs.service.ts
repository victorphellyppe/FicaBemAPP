import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class RavvsService extends ApiService {

  constructor(storage:Storage, http: HttpClient) {
    super(storage, http)
  }

  /** Busca informações da página Quem Somos */
  public async buscarInformacoes(): Promise<{descricao: string}[]> {
    return await this.get('/ravvs/quem-somos', true);
  }
  
  /** Busca informações da página Quem Somos */
  public async contatoRAVVS(): Promise<{telefone:string, email:string, endereco:string}> {
    return await this.get('/ravvs/contato', true);
  }

  /** Busca as Unidades de apoio da RAVVS */
  public async buscarUnidadesSaudeReferencia(): Promise<{descricao:string, endereco: string}[]> {
    return await this.get('/ravvs/grupos', true);
  }
}
