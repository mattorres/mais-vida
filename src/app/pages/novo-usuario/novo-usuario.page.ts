import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/services/services.service';
import { Estado } from 'src/app/models/estado';
import { Escolaridade } from 'src/app/models/escolaridade';
import { Nacionalidade } from 'src/app/models/nacionalidade';
import { SituacaoConjugal } from 'src/app/models/situacaoConjugal';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.page.html',
  styleUrls: ['./novo-usuario.page.scss'],
})
export class NovoUsuarioPage implements OnInit {

  estados: Estado[] = [];
  escolaridades: Escolaridade[] = [];
  nacionalidades: Nacionalidade[] = [];
  situacoes: SituacaoConjugal[] = [];

  formPaciente: FormGroup;
  foto: string = "assets/img/Group-2340.png";
  usuario = new Usuario();
  usuarios: any;


  constructor(
    public services: Services,
    public formBuilder: FormBuilder,
    public navController: NavController,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(res => {
      if (res.usuario) {
        this.usuario = JSON.parse(res.usuario);
        console.log(this.usuario)
      }
    })
  }

  ngOnInit() {
    this.listarEstados();
    this.listarEscolaridades();
    this.listarNacionalidades();
    this.listarSituacoes();
    this.validarCampos();
    this.buscarUsuario();
  }

  buscarUsuario() {
    this.formPaciente.controls['nmUsuario'].setValue(this.usuario.nmUsuario);
    this.formPaciente.controls['email'].setValue(this.usuario.email);
    this.formPaciente.controls['nacionalidade'].setValue(this.usuario.nacionalidade);
    this.formPaciente.controls['estado'].setValue(this.usuario.estado);
    this.formPaciente.controls['escolaridade'].setValue(this.usuario.escolaridade);
    this.formPaciente.controls['situacaoConjugal'].setValue(this.usuario.situacaoConjugal);
    this.formPaciente.controls['frequentaEscola'].setValue(this.usuario.frequentaEscola);
    this.formPaciente.controls['nmMae'].setValue(this.usuario.nmMae);
    this.formPaciente.controls['nmPai'].setValue(this.usuario.nmPai);
  }


  async selecionarFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecione uma imagem ou tire uma foto',
      buttons: [{
        text: 'Use a camera',
        role: 'destructive',
        icon: 'camera',
        handler: () => {
          this.selecionarImagem(this.camera.PictureSourceType.CAMERA)
        }
      }, {
        text: 'Ver a galéria',
        icon: 'images',
        handler: () => {
          this.selecionarImagem(this.camera.PictureSourceType.PHOTOLIBRARY)
        }
      }
      ]
    });
    await actionSheet.present();
  }

  selecionarImagem(sourceType: number) {
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.usuario.foto = base64Image;
    }, (err) => {
      // Handle error
    });
  }

  validarCampos() {
    this.formPaciente = this.formBuilder.group({
      nmUsuario: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.minLength(3)]),
      nacionalidade: new FormControl("", [Validators.required, Validators.maxLength(1)]),
      estado: new FormControl("", [Validators.required, Validators.minLength(1)]),
      escolaridade: new FormControl("", [Validators.required, Validators.minLength(1)]),
      situacaoConjugal: new FormControl("", [Validators.required, Validators.minLength(1)]),
      frequentaEscola: new FormControl("", [Validators.required, Validators.minLength(1)]),
      nmMae: new FormControl("", [Validators.required, Validators.minLength(2)]),
      nmPai: new FormControl("", [Validators.required, Validators.minLength(2)])
    })
  }

  salvarPaciente() {
    this.services.salvarUsuario(this.formPaciente.value).then(
      res => {
        console.log(res)
        this.navController.back();
      }
    )
    // this.navController.navigateBack('')
  }

  listarEstados() {
    this.services.listarEstados()
      .subscribe(estados => {
        this.estados = estados
      })
  }

  listarEscolaridades() {
    this.services.listarEscolaridades()
      .subscribe(escolaridades => {
        this.escolaridades = escolaridades;
      })
  }

  listarNacionalidades() {
    this.services.listarNacionalidades()
      .subscribe(
        nacionalidades => {
          this.nacionalidades = nacionalidades;
        }
      )
  }

  listarSituacoes() {
    this.services.listarSituacoes()
      .subscribe(situacoes => {
        this.situacoes = situacoes
      })
  }

}
