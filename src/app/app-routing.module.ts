import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404Component } from './content/error/error404/error404.component';
import { SigninComponent } from './content/auth/signin/signin.component';
import { SignupComponent } from './content/auth/signup/signup.component';

const routes: Routes = [
  {
    path      : 'auth/signin',
    component : SigninComponent
  },
  {
    path      : 'auth/signup',
    component : SignupComponent
  },
  {
    path         : '',
    loadChildren : () => import('./content/content.module').then( m => m.ContentModule )
  },
  {
    path      : '**',
    component : Error404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
