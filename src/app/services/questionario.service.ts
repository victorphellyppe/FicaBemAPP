import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioService extends ApiService {

  constructor(storage:Storage, http: HttpClient) {
    super(storage, http)
  }

  /** Cadastra um novo questionário */
  public async cadastrar(dados: object): Promise<{sucesso:boolean, erro?: string}> {
    try {
      console.log(dados);
      await this.post('/questionario', dados, true);
      return {sucesso: true};
    } catch(erro) {
      return {sucesso: false, erro: erro.error};
    }
  }

    /** Cadastra um novo questionário */
    public async cadastrarDenuncia(dados: object): Promise<{sucesso:boolean, erro?: string}> {
      try {
        console.log(dados);
        await this.post('/denuncia', dados, true);
        return {sucesso: true};
      } catch(erro) {
        return {sucesso: false, erro: erro.error};
      }
    }
}
