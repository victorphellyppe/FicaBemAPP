import { Component, OnInit, ViewChild } from '@angular/core';
import { Personagem } from 'src/app/components/btn-ajuda/personagem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonContent, LoadingController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacoes',
  templateUrl: './informacoes.page.html',
  styleUrls: ['./informacoes.page.scss'],
})
export class InformacoesPage implements OnInit {


  ajuda = new Personagem("Caso deseje, nesta página pode atualizar algumas informações da sua conta.")

  //Form 
  form:FormGroup;
  formSenha:FormGroup;

  msg: any = false;

  @ViewChild('ionContent', {static:true})
  ionContent:IonContent

  constructor(private formBuilder:FormBuilder, private usuarioSvc:UsuarioService, 
            private loadingCtrl:LoadingController, private toastController: ToastController, 
            private router:Router) { }

  ngOnInit() {
    const usuario = this.usuarioSvc.usuarioLogado;
    
    //Form de Perfil
    this.form = this.formBuilder.group({
      nome: [usuario.nome, Validators.required],
      email: [usuario.email, [Validators.required, Validators.email]],
      telefone: [usuario.telefone, Validators.required],
      data_nascimento: [usuario.data_nascimento, Validators.required],
    });
    //Form de senha
    this.formSenha = this.formBuilder.group({
      senha: ['', [Validators.required, Validators.minLength(6)]],
      senha2: ['', Validators.required],
    }, {validators: this.validaSenhas });
  }

  /** Valida as senhas estão iguais */
  private validaSenhas(group: FormGroup) {
    const senha = group.get('senha').value;
    const senha2 = group.get('senha2').value;
    return senha === senha2 ? null : { senhasDiferentes: true }     
  }

  /**
  * Realiza o cadastro do usuário
  */
  async atualizar() {
    const usuario = Object.assign(new Usuario, this.form.value);
    const loading = await this.loadingCtrl.create({message: 'Aguarde, salvando seus dados', spinner: 'circles', backdropDismiss: false});
    loading.present();

    let resposta = await this.usuarioSvc.atualizar(usuario)
    if (resposta.sucesso) {
      this.toastController.create({
        message: 'Conta atualizada com sucesso',
        duration: 2000
      }).then(t => t.present())
      this.msg = '';
    } else {
      this.msg = 'Ah não :(. Não foi possivel atualizar sua conta, devido aos seguintes problemas: \n';
      for (let erro in resposta.erro)
        this.msg += resposta.erro[erro];
      this.ionContent.scrollToTop(1000);
    }
    loading.dismiss(); 
  }  

  /** Atualiza a senha do usuário */
  async atualizarSenha() {
    const senha = this.formSenha.get('senha').value;
    const loading = await this.loadingCtrl.create({message: 'Aguarde, salvando seus dados', spinner: 'circles', backdropDismiss: false});
    loading.present();

    let resposta = await this.usuarioSvc.atualizarSenha(senha);

    if (resposta.sucesso) {
      this.toastController.create({
        message: 'Senha atualizada com sucesso',
        duration: 2000
      }).then(t => t.present())
      this.msg = '';
    } else {
      this.msg = 'Ah não :(. Não foi possivel atualizar sua senha, devido aos seguintes problemas: \n';
      for (let erro in resposta.erro)
        this.msg += resposta.erro[erro];
      this.ionContent.scrollToTop(1000);
    } 
    loading.dismiss(); 

  }

    /** Desloga o usuário, habilitando novamente o botão de entrar */
    desconectar() {
      this.usuarioSvc.deslogar();  
      this.toastController.create({
        message: 'Deslogado',
        duration: 2000
      }).then(t => t.present());
      this.router.navigateByUrl('login');
    }

}
