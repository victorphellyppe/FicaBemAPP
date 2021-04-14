import { Component, OnInit, ViewChild } from '@angular/core';
import { Personagem } from 'src/app/components/btn-ajuda/personagem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { ToastController, LoadingController, IonContent, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  ajuda = new Personagem("Olá\nPara a gente melhor, te atender você pode criar uma conta.\n\
                        O seu nome ajudará a saber como devo chamá-la.\n\
                        Seu email e senha para acessar o sistema.\n\
                        E telefone caso precise de ajuda.")

  //Form 
  form:FormGroup;

  @ViewChild('ionSlides', {static:true})
  ionSlides: IonSlides

  msg: any = false;
  avatar: string = '';

  constructor(private formBuilder:FormBuilder, private usuarioSvc:UsuarioService, 
              private router:Router, private toastController: ToastController, 
              private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /** Avança para o próximo Slide */
  async avancar() {
      this.ionSlides.slideNext();
  }

  /**
   * Realiza o cadastro do usuário
   */
  async cadastrar() {
    const load = await this.loadingCtrl.create({
      message: 'Aguarde...',
      spinner: 'circles'
    });
    load.present()

    const dados = this.form.value;
    console.log(dados);

    
    const usuario = Object.assign(new Usuario, this.form.value);
    let resposta = await this.usuarioSvc.cadastrar(usuario)
    load.dismiss()
    if (resposta.sucesso) {
      this.toastController.create({
        message: 'Conta criada com sucesso',
        duration: 2000
      }).then(t => t.present())
      this.router.navigateByUrl('/home');
    } else {
      this.msg = 'Ah não :(. Não foi possivel criar sua conta, devido aos seguintes problemas: \n';
      for (let erro in resposta.erro)
        this.msg += resposta.erro[erro];
    }
  } 

}
