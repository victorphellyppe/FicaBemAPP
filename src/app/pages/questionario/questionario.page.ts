import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Personagem } from 'src/app/components/btn-ajuda/personagem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController, IonContent, ModalController } from '@ionic/angular';
import { QuestionarioService } from 'src/app/services/questionario.service';
import * as moment from 'moment';
import { HomePage } from '../dashboard/home/home.page';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.page.html',
  styleUrls: ['./questionario.page.scss'],
})
export class QuestionarioPage implements OnInit {
  
  ajuda = new Personagem("Aqui você pode registrar o ocorrido.\n\n\
              Além de ajuda a RAVVS e outras vítimas, nós iremos entrar em contato com você com o suporte mais indicado.")

  //Form 
  form:FormGroup;

  @ViewChild('ionContent', {static: true})
  ionContent:IonContent;
  
  

  msg: any = false;
  //Exibe a mensagem quando o conteúdo é cadastrado com sucesso 
  sucesso = false;

  constructor(private formBuilder:FormBuilder, private usuarioSvc:UsuarioService, 
              private router:Router, private toastController: ToastController,
              private alertCtrl: AlertController, private questionariSrv: QuestionarioService,
              private loadingCtrl: LoadingController, private modalController: ModalController) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      //Novos Dados
      denuncia: ['9'],
      anonimo:[false],
      nome:[null],
      telefone:[null],
      endereco:[null],
      cpf:[null],
      data_nascimento:[null],
      genero:['feminino'],
      raca:[9],


      //Dados da Vitima
      drogas_familia: [false],
      usuario_droga_familia: [''],
      tem_beneficio: [false],
      beneficio: [''],
      denunciado: [false],
      motivo_nao_denunciar: [null],
      abuso_anterior: [false],
      abusador_anterior: [''],
      observacao: [''],
      gestante: ['9'],
      escolaridade: ['9'],
      zona: ['9'],
      estado_civil: ['9'],
      orientacao_sexual: ['9'],
      identidade_genero: ['8'],
      tem_transtorno: [false],
      transtornos: [''],
      //Dados da ocorrência
      dia_ocorrencia: [null],
      hora_ocorrencia: [null],
      local: [['99']],
      ocorreu_outras_vezes: ['2'],
      lesao_autoprovocada: ['9'],
      //Violencia
      motivo_violencia: ['1'],
      tipo_violencia: [null],
      meio_violencia: [null],
      violencia_sexual: [null],
      violencia_trabalho: ['9'],
      //Autor da violência
      numero_envolvidos: ['1'],
      vinculo_agressor: [null],
      sexo_agressor: ['9'],
      uso_alcool: ['9'],
      idade_agressor: ['9'],
    });
  }

  

  /**
  * Realiza o cadastro do usuário
  */
  async salvar() {
    
    this.alertCtrl.create({
      header: 'Enviar as informações?',
      message:'Garanto que as informações que serão enviadas a RAVVS são verídicas',
      buttons: [
        'Cancelar',
        {text: 'Enviar', handler:async () => {
          
          const dados = this.form.value;
      
          const loading = await this.loadingCtrl.create({message: 'Aguarde, os dados estão sendo enviados', spinner: 'circles'});
          loading.present();

          let resposta = await this.questionariSrv.cadastrar(dados)
          console.log(resposta)
          if (resposta.sucesso) {
            this.sucesso = true;
          } else {
            console.log(resposta);
            this.msg = 'Ah não :(. Não foi possivel criar sua conta, devido aos seguintes problemas: \n';
            this.msg += resposta.erro;
            this.ionContent.scrollToTop(1000);  
          }
          loading.dismiss();
        }}
      ]
    }).then(a => a.present())
}



}
