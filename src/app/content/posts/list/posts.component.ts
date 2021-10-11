import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PostsService } from '../posts.service';

export class Page {
  size          : number = 0; // The number of elements in the page
  totalElements : number = 0; // The total number of elements
  totalPages    : number = 0; // The total number of pages
  pageNumber    : number = 0; // The current page number
}

@Component({
  selector      : 'app-posts',
  templateUrl   : './posts.component.html',
  styleUrls     : ['./posts.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class PostsComponent implements OnInit, OnDestroy
{

  private _unsubscribeAll: Subject<any>

  public data             : any      = null;
  public displayedColumns : string[] = [ "id", "data", "lastInteraction", "name", "atendente", "unidade", "equipe", "percepcao" ];
  public reorderable      : boolean  = true;

  public page = new Page();


  /**
   * Constructor
   *
   * @param {PostsService} _postsService
   */
   constructor(
    private _postsService: PostsService
  )
  {
    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.page.pageNumber = 0;
    this.page.size       = 12;
  }


  ngOnInit(): void
  {
    this._postsService.onDataLoaded
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe( ( res : any ) => {

        this.data = res.data;

      });
  }


  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


}
