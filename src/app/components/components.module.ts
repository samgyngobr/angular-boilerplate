import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarModule } from './sidebar/sidebar.module';
import { HeaderModule } from './header/header.module';
import { LayoutModule } from './layout/layout.module';
import { LoadingModule } from './loading/loading.module';
import { AppProgressBarModule } from './app-progress-bar/app-progress-bar.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    SidebarModule,
    HeaderModule
  ],
  exports:[
    SidebarModule,
    HeaderModule,
    LayoutModule,
    LoadingModule,
    AppProgressBarModule
  ]
})
export class ComponentsModule { }
