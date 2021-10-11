import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CleanComponent } from './components/layout/clean/clean.component';
import { MainComponent } from './components/layout/main/main.component';

import { Error404Component } from './content/error/error404/error404.component';
import { SigninComponent } from './content/auth/signin/signin.component';
import { SignupComponent } from './content/auth/signup/signup.component';

const routes: Routes = [
  {
    path : '',
    component: MainComponent,
    children: [
      {
        path         : 'dashboard',
        loadChildren : () => import('./content/dashboard/dashboard.module').then( m => m.DashboardModule )
      },
      {
        path         : 'posts',
        loadChildren : () => import('./content/posts/posts.module').then( m => m.PostsModule )
      },
      {
        path         : 'inventory',
        loadChildren : () => import('./content/inventory/inventory.module').then( m => m.InventoryModule )
      },
      {
        path       : '',
        redirectTo : '/dashboard',
        pathMatch  : 'full'
      },
    ],
  },
  {
    path : '',
    component: CleanComponent,
    children: [
      {
        path      : 'auth/signin',
        component : SigninComponent
      },
      {
        path      : 'auth/signup',
        component : SignupComponent
      },
      {
        path      : '**',
        component : Error404Component
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
