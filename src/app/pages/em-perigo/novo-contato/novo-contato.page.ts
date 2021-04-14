import { Component, OnInit } from '@angular/core';
import { ContatosService } from 'src/app/services/contatos.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contato } from 'src/app/models/contato';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-contato',
  templateUrl: './novo-contato.page.html',
  styleUrls: ['./novo-contato.page.scss'],
})
export class NovoContatoPage implements OnInit {

  form: FormGroup;
  msg: string = '';

  constructor(private contatosSrv:ContatosService, private toastCtrl: ToastController,
      private formBuild:FormBuilder, private loadCtrl: LoadingController, 
      private router:Router) { }

  ngOnInit() {
    this.form = this.formBuild.group({
      'nome': ['', Validators.required],
      'telefone': ['', Validators.required],
    });
  }

  /**
   * Salva o contato
   */
  async salvar() {
    const loading = await this.loadCtrl.create({message: 'Aguarde',backdropDismiss: false, spinner:'circles'})
    loading.present();

    const contato = Object.assign(new Contato, this.form.value)
    const resposta = await this.contatosSrv.cadastrar(contato);
    loading.dismiss()

    if (resposta.sucesso) {
      (await this.toastCtrl.create({message: 'Criado com sucesso', duration:2000 })).present()
      this.msg = '';
      this.router.navigateByUrl('/em-perigo/contatos');
    } else {
      this.msg = 'Não foi possível cadastrar devido: ';
    this.msg += resposta.erro;
    }
  }

}
