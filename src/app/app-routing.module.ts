import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: '',
    loadChildren: './pages/usuario/usuario.module#UsuarioPageModule'
  },
  {
    path: 'novo-usuario',
    loadChildren: './pages/novo-usuario/novo-usuario.module#NovoUsuarioPageModule'
  },
  {
    path: 'novo-usuario:usuario',
    loadChildren: './pages/novo-usuario/novo-usuario.module#NovoUsuarioPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
