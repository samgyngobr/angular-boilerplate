import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SidebarModule } from '../components/sidebar/sidebar.module';
import { HeaderModule } from '../components/header/header.module';

import { ContentComponent } from './content.component';

const routes: Routes = [
  {
    path: '',
    component : ContentComponent,
    children :[
      {
        path         : 'dashboard',
        loadChildren : () => import('./dashboard/dashboard.module').then( m => m.DashboardModule )
      },
      {
        path         : 'posts',
        loadChildren : () => import('./posts/posts.module').then( m => m.PostsModule )
      },
      {
        path         : 'inventory',
        loadChildren : () => import('./inventory/inventory.module').then( m => m.InventoryModule )
      },
      {
        path       : '',
        redirectTo : '/dashboard',
        pathMatch  : 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatSidenavModule,

    SidebarModule,
    HeaderModule
  ]
})
export class ContentModule { }
