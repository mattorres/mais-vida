import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado';
import { Nacionalidade } from '../models/nacionalidade';
import { Escolaridade } from '../models/escolaridade';
import { SituacaoConjugal } from '../models/situacaoConjugal';
import { Usuario } from '../models/usuario';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class Services {

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) { }

  listarEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>("./../../assets/data/estados.json")
  }

  listarNacionalidades(): Observable<Nacionalidade[]> {
    return this.http.get<Nacionalidade[]>("./../../assets/data/nacionalidade.json")
  }

  listarEscolaridades(): Observable<Escolaridade[]> {
    return this.http.get<Escolaridade[]>("./../../assets/data/escolaridade.json")
  }

  listarSituacoes(): Observable<SituacaoConjugal[]> {
    return this.http.get<SituacaoConjugal[]>("./../../assets/data/situcaoConjugal.json")
  }

  listarPacientes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>("./../../assets/data/usuarios.json")
  }

  excluirUsuario(usuario: Usuario) {
    return new Promise((resolve, reject) => {
      this.storage.get("usuarios").then(
        res => {
          let usuarios: Usuario[] = [];
          usuarios = res;
          usuarios.forEach((item, index) => {
            if (item.id == usuario.id) usuarios.splice(index, 1);
            this.storage.set("usuarios", usuarios).then(
              res => {
                resolve(res)
              }
            )
              .catch(error => {
                reject(error)
              })
          })
        }
      )
    })
  }

  salvarUsuario(usuario: any): Promise<any> {
    return this.storage.get("usuarios").then(
      res => {
        let usuarios: Usuario[] = [];
        if (res != null) {
          usuarios = res;
          this.storage.set("usuarios", usuarios)
        }
        usuarios.push(usuario)
        this.storage.set("usuarios", usuarios)
      }
    )
  }

  listarUsuariosStorage(): Promise<Usuario[]> {
    return new Promise((resolve, reject) => {
      this.storage.get("usuarios").then(
        res => {
          resolve(res)
        },
      )
    })
  }
}
