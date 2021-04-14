import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuario } from '../models/usuario';
import { ApiService } from './api.service';
// import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * Gerência os dados do Usuario
 * @author Carlos W. Gama 
 */
export class UsuarioService extends ApiService {

  /** Dados do usuário logado */
  public usuarioLogado: Usuario = null;

  constructor(storage:Storage, http: HttpClient) {
    super(storage, http)
    this.initialize()
  }
  
  async initialize() {
    this.usuarioLogado = await this.storage.get('usuario');
  }

  /** Cadastra um novo usuário */
  public async cadastrar(usuario: Usuario): Promise<any> {
      try {
        const retorno:any = await this.post('/usuarios', {usuario});
        //salva o usuario
        usuario = Object.assign(usuario, retorno.usuario)
        this.storage.set('usuario', usuario);
        this.setJWT(retorno.jwt);
        this.usuarioLogado = usuario;
        return {sucesso:true}
      } catch (erro) {
        //Não conseguiu cadastrar
        console.log('erro');
        return {sucesso:false, erro: erro.error}
      }
  }

  /** Loga um usuário */
  public async logar(email, senha): Promise<boolean> {
    try {
      const resposta = await this.post('/login', {email, senha})
      let usuario = Object.assign(new Usuario, resposta.usuario)
      this.storage.set('usuario', usuario);
      this.setJWT(resposta.jwt);
      this.usuarioLogado = usuario;
      return true;
    } catch (erro) {
      console.log(erro);
      return false
    }
  }

  /** Recuperar Senha */
  public async recuperarSenha(email: string): Promise<boolean> {
    try {
      await this.put('/senha', {email})
      return true;
    } catch (erro) {
      console.log(erro);
      return false
    }
  }

  /** Atualiza os dados do usuário */
  public async atualizar(usuario: Usuario): Promise<{sucesso: boolean, erro?: any}> {
    try {
      await this.put('/usuarios/dados', {usuario}, true)
      return {sucesso:true}
    } catch (erro) {
      return {sucesso: false, erro: erro.error}
    }
  }

  /** Atualiza a senha do usuário logado */
  public async atualizarSenha(senha: string): Promise<{sucesso: boolean, erro?: any}> {
    try {
      await this.put('/usuarios/senha', {usuario:{senha}}, true)
      return {sucesso:true}
    } catch (erro) {
      return {sucesso: false, erro: erro.error}
    }
  }

  /**Busca um usuário pelo ID */
  public async buscar(id:number): Promise<Usuario|null> {
    try {
      const resposta = await this.get('/usuarios/'+id)
      return Object.assign(new Usuario, resposta.usuario)
    } catch (erro) {
      return null
    }
  }

  /** Desloga o usuário */
  public deslogar() {
    this.usuarioLogado = null;
    this.storage.remove('usuario')
  }
}
