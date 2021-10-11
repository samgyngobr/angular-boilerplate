import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './app-progress-bar.component.html',
  styleUrls: ['./app-progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppProgressBarComponent implements OnInit, OnDestroy
{

  public visible: boolean = false;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} _router
   */
  constructor( private _router: Router )
  {
    this._unsubscribeAll = new Subject();
  }



  /**
   * On init
   */
  ngOnInit(): void
  {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        //console.log('visible', true);
        this.visible = true;
      });

    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel))
      .subscribe(() => {
        //console.log('visible', false);
        this.visible = false;
      });
  }



  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }



}
