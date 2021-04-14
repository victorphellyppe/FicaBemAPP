import { Injectable } from '@angular/core';
import { API_URL } from './../../environments/environment';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * Classe Responsável por acessar o servidor 
 */
export class ApiService {

  //URL para a API
  protected readonly API = API_URL;
  //Token do usuário para acessar URL privadas
  private jwt = null;

  public constructor(protected storage: Storage, protected http: HttpClient) { }

  /**
   * Retorna a URL completa para a API
   * @param url Rota de acesso do recurso da API
   */
  protected api(url: string): string {
    return this.API+url
  }

  /**
   * Realiza uma busca na API
   * @param url 
   * @param autenticado É necessário estar autenticado?
   */
  protected async get(url: string, autenticado: boolean = false): Promise<any> {
    let headers = {}
    if (autenticado) headers['headers'] = {'Authorization': await this.getJWT()}
    return this.http.get(this.api(url), headers).toPromise()
  }

  /**
   * Realiza um cadastro
   * @param url 
   * @param params 
   * @param autenticado É necessário estar autenticado?
   */
  protected async post(url: string, params?: any, autenticado: boolean = false):Promise<any> {
    let headers = {}
    if (autenticado) headers['headers'] = {'Authorization': await this.getJWT()}
    console.log(headers)
    return this.http.post(this.api(url), params, headers).toPromise()
  }

  /**
   * Realiza uma atualização
   * @param url 
   * @param params 
   * @param autenticado É necessário estar autenticado?
   */
  protected async put(url: string, params: any, autenticado: boolean = false):Promise<any> {
    let headers = {}
    if (autenticado) headers['headers'] = {'Authorization': await this.getJWT()}
    console.log(headers)
    return this.http.put(this.api(url), params, headers).toPromise()
  }

  /**
   * Remove um dado na api
   * @param url 
   * @param autenticado É necessário estar autenticado?
   */
  protected async delete(url: string, autenticado: boolean = false) {
    let headers = {}
    if (autenticado) headers['headers'] = {'Authorization': await this.getJWT()}
    return this.http.delete(this.api(url), headers).toPromise()
  }

  /**
   * Armazena o token do usuário logado
   * @param jwt 
   */
  protected setJWT(jwt: string) {
    this.storage.set('jwt', jwt)
    this.jwt = jwt
  }

  /**
   * Recupera o JWT
   */
  private async getJWT() {
    if (this.jwt == null) 
      this.jwt = await this.storage.get('jwt');
    return this.jwt
  }

  /**
   * Remove o token do usuário logado
   * @param jwt 
   */
  protected removeJWT(){
    this.storage.remove('jwt')
    this.jwt = null
  }
}
