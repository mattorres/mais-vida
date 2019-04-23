import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsuarioPage } from './usuario.page';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { Services } from 'src/app/services/services.service';
import { OpcaoUsuarioComponent } from './opcao-usuario/opcao-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    OpcaoUsuarioComponent
  ],
  declarations: [UsuarioPage, UsuarioListComponent, OpcaoUsuarioComponent],
  providers: [
    Services
  ],
})
export class UsuarioPageModule { }
