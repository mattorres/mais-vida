import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NovoUsuarioPage } from '../novo-usuario/novo-usuario.page';
import { Services } from 'src/app/services/services.service';
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  barraPesquisa: boolean = false;
  usuarios: Usuario[] = [];
  searchTerm: string = ""

  constructor(
    public navController: NavController,
    public services: Services
  ) { }

  ngOnInit() {
    this.listarUsuarios();
  }


  filtrarUsuarios(event) {
    let val = event.target.value;
    if (val && val.trim() !== '') {
      this.usuarios = this.usuarios.filter((usuario) => {
        return usuario.nmUsuario.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    }
    else {
      this.listarUsuarios();
    }
  }

  habilitarBarraPesquisa() {
    if (this.barraPesquisa) {
      this.barraPesquisa = false;
    }
      this.barraPesquisa = true;
  }

  excluirUsuario(usuario) {
    this.services.excluirUsuario(usuario).then(res => {
      this.listarUsuarios();
    })
  }

  editarPaciente(paciente) {
    console.log(paciente)
  }

  listarUsuarios() {
    this.services.listarUsuariosStorage()
      .then(
        res => {
          this.usuarios = res;
        }
      )
  }

  novoUsuario() {
    this.navController.navigateForward('novo-usuario')
  }

}
