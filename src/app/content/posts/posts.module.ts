import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PostsComponent } from './list/posts.component';
import { PostsService } from './posts.service';

const routes: Routes = [
  {
    path      : '',
    component : PostsComponent,
    resolve   : { res : PostsService }
  },
];

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    MatToolbarModule
  ],
  exports: [RouterModule],
  providers: [PostsService]
})
export class PostsModule { }
