import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UsuarioService } from './usuario.service';
import { Contato } from '../models/contato';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContatosService  extends ApiService {

  constructor(storage:Storage, http: HttpClient, private usuarioSrv:UsuarioService, 
    private callNumber: CallNumber, private sms:SMS, private geolocation: Geolocation) {
    super(storage, http)
  }

  /** Retorna os contatos */
  async buscar(): Promise<Contato[]> {
    return this.get('/contatos', true).then(resposta => {
      const contatos = [];
      resposta.contatos.forEach(c => contatos.push(Object.assign(new Contato, c)))
      return contatos;
    })
  }

  /**
   * Insere um novo contato na posiçaõ informada
   * @param contato 
   */
  public async cadastrar(contato: Contato): Promise<{sucesso:boolean, erro?: string}> {
    try {
      await this.post('/contatos', {contato}, true)
      return {sucesso:true}
    } catch (erro) {
      return {sucesso: false, erro: erro.error}
    }
  }

  /**
   * Remove um contato cadastrado
   * @param contatoID 
   */
  public async remover(contatoID: number): Promise<{sucesso:boolean, erro?: string}> {
    try {
      await this.delete(`/contatos/${contatoID}`, true)
      return {sucesso:true}
    } catch (erro) {
      return {sucesso: false, erro: erro.error}
    }
  }

  /**
   * Ativa ou desativa um contato
   * @param contatoID
   * @param ativar
   */
  public async ativar(contato: Contato): Promise<{sucesso:boolean, erro?: string}> {
    try {
      await this.put(`/contatos/${contato.id}/${contato.ativo ?  1 : 0}`, {}, true)
      return {sucesso:true}
    } catch (erro) {
      return {sucesso: false, erro: erro.error}
    }
  }

  /**
   * Solicita um pedido de ajuda por ligação
   * @param telefone 
   */
  public async ligar(telefone) {
    this.callNumber.callNumber(telefone, true);
  }

  /**
   * Solicita um pedido de ajuda por SMS
   * @param telefone 
   * @todo adicionar <uses-permission android:name="android.permission.SEND_SMS"/> em android/app/src/main/AndroidManifest.xml
   * @return Promise<Boolean> true -> Enviou | False -> Falhou 
   */
  public async enviarSMS(telefone: string | string[] ) {
    try {
      let msg = 'Estou em perigo! Estou enviado essa mensagem através do aplicativo da RAVVS. Segue a minha localização: ';
      if (typeof(telefone) == "string") 
        return await this.sms.send(telefone, msg);     
    else {
      for (let i = 0; i < telefone.length; i++)  
        await this.sms.send(telefone[i], msg);
    }
      return true;
    } catch(e) {
      return false; //Falha no envio 
    }
  }
}
