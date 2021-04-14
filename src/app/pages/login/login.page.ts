import { Component, OnInit } from '@angular/core';
import { Personagem } from 'src/app/components/btn-ajuda/personagem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
/**
 * tela para cadastrar o usuário
 * @author Carlos W. Gama
 */
export class LoginPage implements OnInit {

  form:FormGroup;
  formRecuperar:FormGroup;
  tela = 1;            
  
  constructor(private formBuilder: FormBuilder, private usuarioSvc:UsuarioService, private router:Router,
      private loadingCtrl:LoadingController, private toastController: ToastController) { 
    
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.minLength(6), Validators.required]]
    })
    this.formRecuperar = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    })
  }

  /**
   * Tenta loga o usuário no sistema
   */
  async logar() {
    const load = await this.loadingCtrl.create({message:'Conectando', spinner:'circles'})
    load.present()

    const dados = this.form.value;
    const resultado = await this.usuarioSvc.logar(dados.email, dados.senha) 
    load.dismiss()
    if (resultado) {
      this.router.navigateByUrl('/home')
    } else {
      this.toastController.create({
        message: 'Erro! Email ou senha incorreta', 
        closeButtonText:'Fechar', 
        showCloseButton: true
      }).then(t => t.present())
    }
  }

  /**
   * Recuperar Senha
   */
  async recuperarSenha() {
    const load = await this.loadingCtrl.create({message:'Enviando requisição', spinner:'circles'})
    load.present()

    const dados = this.formRecuperar.value;
    const resultado = await this.usuarioSvc.recuperarSenha(dados.email) 
    load.dismiss()
    if (resultado) {
      this.toastController.create({
        message: 'Foi enviado um email para sua conta, com instruções para recuperar sua senha', 
        closeButtonText:'Fechar', 
        showCloseButton: true
      }).then(t => t.present())
    } else {
      this.toastController.create({
        message: 'Erro! Email não encontrado', 
        closeButtonText:'Fechar', 
        showCloseButton: true
      }).then(t => t.present())
    }
  }

}
