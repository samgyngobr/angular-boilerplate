import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DashboardService } from './dashboard.service';

@Component({
  selector      : 'app-dashboard',
  templateUrl   : './dashboard.component.html',
  styleUrls     : ['./dashboard.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy
{


  private _unsubscribeAll: Subject<any>

  public data : any = null;

  tooltip : any = {
    shared: true,
    intersect: false,
    y: {
      function(y:any) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " points";
        }
        return y;
      }
    }
  };


  /**
   * Constructor
   *
   * @param {DashboardService} _dashboardService
   */
  constructor(
    private _dashboardService: DashboardService
  )
  {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }



  ngOnInit(): void
  {
    this._dashboardService.onDataLoaded
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe( ( res : any ) => {

        this.data = res;

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
