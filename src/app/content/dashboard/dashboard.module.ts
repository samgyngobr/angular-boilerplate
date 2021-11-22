import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from "ng-apexcharts";

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
    FlexLayoutModule,

    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    NgApexchartsModule
  ],
  exports: [ RouterModule ],
  providers: [ DashboardService ]
})
export class DashboardModule { }
