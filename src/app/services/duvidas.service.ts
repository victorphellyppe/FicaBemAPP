import { Injectable } from '@angular/core';
import { Duvida, Comentario } from '../models/duvida';
import { Usuario } from '../models/usuario';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DuvidasService extends ApiService {

  constructor(storage:Storage, http: HttpClient) {
    super(storage, http)
  }

  /** Cadastra uma nova duvida */
  public async cadastrar(duvida: Duvida): Promise<{sucesso: boolean, erro?: any}> {
    try {
      const resposta = await this.post('/duvidas', {duvida}, true);
      return {sucesso:true}
    } catch (erro) {
      console.log(erro.error)
      return {sucesso: false, erro: erro.error}
    }
  }

  /** Responde a uma duvida */
  public async responder(duvida: Duvida, texto: string): Promise<Comentario> {
    let comentario = new Comentario(null, null, texto);
    //Envia ao servidor
    try {
      comentario = await this.post('/duvidas/comentario/' + duvida.id, {comentario}, true);
      return Object.assign(new Comentario, comentario);
    } catch (erro) {
      return null;
    }
  }

  /**
   * Retorna as 20 ultimas duvidas
   */
  public async ultimos(): Promise<Duvida[]> {
    try {
      const resposta = await this.get('/duvidas');
      const duvidas = [];
      resposta.forEach(d => duvidas.push(Object.assign(new Duvida, d)))
      return duvidas;
    } catch (erro) {
      return [];
    }
  }

  /**
   * Retorna as 20 ultimas duvidas
   */
  public async minhasDuvidas(): Promise<Duvida[]> {
    try {
      const resposta = await this.get('/duvidas/minhas', true);
      const duvidas = [];
      resposta.forEach(d => duvidas.push(Object.assign(new Duvida, d)))
      return duvidas;
    } catch (erro) {
      return [];
    }
  }

  /** Retorna duvidas de uma busca */
  public async buscar(texto: string): Promise<Duvida[]> {
    try {
      const resposta = await this.get('/duvidas/busca/' + texto);
      const duvidas = [];
      resposta.forEach(d => duvidas.push(Object.assign(new Duvida, d)))
      return duvidas;
    } catch (erro) {
      return [];
    } 
  }

  /** Remove uma duvida */
  public async remover(id: number) {
      try {
        await this.delete('/duvidas/'+id, true);
        return {sucesso:true}
      } catch (erro) {
        return {sucesso:false, erro:erro.error}
      }
  }

}
