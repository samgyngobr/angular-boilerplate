import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

import { DashboardComponent } from './dashboard.component';

import { DashboardService } from './dashboard.service';

const routes = [
  {
    path      : '',
    component : DashboardComponent,
    resolve   : { res : DashboardService }
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild( routes ),

    MatToolbarModule
  ],
  exports: [ RouterModule ],
  providers: [ DashboardService ]
})
export class DashboardModule { }
