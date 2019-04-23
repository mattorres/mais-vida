import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Services } from 'src/app/services/services.service';
import { Usuario } from 'src/app/models/usuario';
import { AlertController, PopoverController, NavController } from '@ionic/angular';
import { MSG_EXCLUSAO } from 'src/app/util/messages';
import { OpcaoUsuarioComponent } from '../opcao-usuario/opcao-usuario.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
})
export class UsuarioListComponent implements OnInit {

  @Input() usuario = new Usuario();
  @Output() evento = new EventEmitter();

  constructor(
    public services: Services,
    public alertController: AlertController,
    public popoverController: PopoverController,
    public navController: NavController,
    public route: Router
  ) { }

  ngOnInit() {

  }

  editarUsuario(usuario: Usuario) {
    this.route.navigate(['novo-usuario'], { queryParams: { 'usuario': JSON.stringify(usuario) }, skipLocationChange: true });
  }

  async presentPopover(ev: any, usuario: Usuario) {
    const popover = await this.popoverController.create({
      component: OpcaoUsuarioComponent,
      event: ev,
      backdropDismiss: false,
      showBackdrop: false,
      cssClass: 'popover-exclusao',
      translucent: false
    });
    await popover.present();

    popover.onDidDismiss().then((item) => {
      this.confirmarExclusao(usuario)
    })
  }

  async confirmarExclusao(usuario: Usuario) {
    const alert = await this.alertController.create({
      header: 'Deseja excluir este perfil?',
      message: MSG_EXCLUSAO,
      cssClass: 'alert-exclusao',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          cssClass: 'button-exclusao',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'SIM',
          cssClass: 'button-exclusao',
          handler: () => {
            this.evento.emit(usuario)
          }
        },
      ]
    });

    await alert.present();
  }




}
