import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService implements Resolve<any>
{

  onDataLoaded   : BehaviorSubject<any>;
  onIdDataLoaded : BehaviorSubject<any>;
  data           : any;
  dataId         : any;
  id             : any;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor( private _httpClient: HttpClient )
  {
    // Set the defaults
    this.onDataLoaded   = new BehaviorSubject([]);
    this.onIdDataLoaded = new BehaviorSubject([]);
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

      this._httpClient.get( environment.path + '/inventory' )
        .subscribe( ( response: any ) => {

          this.data = response;
          this.onDataLoaded.next(this.data);
          resolve(this.data);

        }, reject);

    });
  }



  getContent(id : any): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      this.id = id;

      let url : string = ( id == 'new' )
                  ? environment.path + '/inventory/create'
                  : environment.path + '/inventory/' + this.id;

      this._httpClient.get( url )
        .subscribe( ( response: any ) => {

          this.dataId = response
          this.onIdDataLoaded.next( this.dataId );

          resolve( this.dataId );

        }, reject);
    });
  }



  saveContent( id : string, arr : any ) : Promise<any>
  {
    let url : string = ( id == 'new' )
      ? environment.path + '/inventory/create'
      : environment.path + '/inventory/' + id;

    return new Promise((resolve, reject) => {

      this._httpClient.post( url, arr )
        .subscribe( ( response: any ) => {

          resolve(response);

        }, reject);
    });
  }


}

@Injectable()
export class InventoryResolve implements Resolve<any>
{

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  /**
   * Constructor
   *
   * @param {InventoryService} _inventoryService
   */
  constructor(
    private _inventoryService: InventoryService
  )
  {
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {Promise<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Promise<any>
  {
    return this._inventoryService.getContent(route.paramMap.get('id'));
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}