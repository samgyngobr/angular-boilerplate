import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent

implements OnInit, OnDestroy
{

  // Private
  private _unsubscribeAll: Subject<any>;

  public visible : boolean = false;

  /**
   * Constructor
   *
   * @param {LoadingService} _loadingService
   */
  constructor( private _loadingService : LoadingService )
  {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }


  ngOnInit()
  {
    this._loadingService.onLoading
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe( data => {
        this.visible = data;
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
