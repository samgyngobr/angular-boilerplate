import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements Resolve<any>
{

  onDataLoaded : BehaviorSubject<any>;
  data         : any;


  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor( private _httpClient: HttpClient )
  {
    // Set the defaults
    this.onDataLoaded   = new BehaviorSubject([]);
  }



  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    return new Promise( ( resolve, reject ) => {

      Promise.all([

        this.getData()

      ]).then( () => {

        resolve([]);

      }, reject );

    });
  }



  /**
   * Get getData
   */
  getData(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      this._httpClient.get( environment.path + '/dashboard' )
        .subscribe( ( response: any ) => {

          this.data = response;
          this.onDataLoaded.next(this.data);
          resolve(this.data);

        }, reject);

    });
  }


}
