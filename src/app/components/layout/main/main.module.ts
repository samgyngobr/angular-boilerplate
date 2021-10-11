import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';

import { SidebarModule } from '../../sidebar/sidebar.module';
import { HeaderModule } from '../../header/header.module';

import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule,

    MatSidenavModule,

    SidebarModule,
    HeaderModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
