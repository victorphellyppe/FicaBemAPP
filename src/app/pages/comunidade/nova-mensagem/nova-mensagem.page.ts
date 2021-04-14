import { Component, OnInit } from '@angular/core';
import { Personagem, Avatar } from 'src/app/components/btn-ajuda/personagem';
import { DuvidasService } from 'src/app/services/duvidas.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Duvida } from 'src/app/models/duvida';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nova-mensagem',
  templateUrl: './nova-mensagem.page.html',
  styleUrls: ['./nova-mensagem.page.scss'],
})
export class NovaMensagemPage implements OnInit {

  ajuda = new Personagem('Nesta página você pode deixar algum depoimento ou dúvida para outros usuários.\n\n\
                        O modo anônimo permite que você poste sem se expor a outros usuários. Mas saiba que nós da RAVVS estaremos de olho para quem ninguém poste algo ilegal!',
                        Avatar.COMUNIDADE)

  form: FormGroup;

  //Mensagem
  msg: string = ''

  constructor(private duvidaSrv:DuvidasService, private usuarioSrv: UsuarioService,
              private loadCtrl: LoadingController, private formBuilder: FormBuilder,
              private toastCtrl:ToastController, private router: Router) { }
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      anonimo: [false],
      mensagem: ['', [Validators.required]],
      titulo: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  /** Salva a duvida */  
  async cadastrar() {
    const loading = await this.loadCtrl.create({message: 'Aguarde',backdropDismiss: false, spinner:'circles'})
    loading.present();
    const dados = this.form.value;
    const duvida = new Duvida(null, dados.anonimo, null, dados.titulo, dados.mensagem);
    const resposta = await this.duvidaSrv.cadastrar(duvida);
    loading.dismiss();

    if (resposta.sucesso) {
      (await this.toastCtrl.create({message: 'Criado com sucesso', duration:2000 })).present()
      this.msg = '';
      this.router.navigateByUrl('/comunidade/minhas-mensagens')
    } else {
      this.msg = 'Não foi possível cadastrar devido: ';
      for(let key in resposta.erro) this.msg += resposta.erro[key][0];
    }
  }

}
