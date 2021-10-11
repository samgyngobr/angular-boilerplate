import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

import { InventoryService } from '../inventory.service';

export class Page {
  size          : number = 0; // The number of elements in the page
  totalElements : number = 0; // The total number of elements
  totalPages    : number = 0; // The total number of pages
  pageNumber    : number = 0; // The current page number
}
@Component({
  selector      : 'app-inventory',
  templateUrl   : './inventory.component.html',
  styleUrls     : ['./inventory.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class InventoryComponent implements OnInit, OnDestroy
{

  private _unsubscribeAll: Subject<any>

  public data             : any      = null;
  public displayedColumns : string[] = [ "id", "title" ];
  public reorderable      : boolean  = true;
  public selected         : any      = [];

  public page = new Page();

  public selection: SelectionType;

  /**
   * Constructor
   *
   * @param {InventoryService} _inventoryService
   * @param {Router} _router
   */
   constructor(
    private _inventoryService: InventoryService,
    private _router: Router
  )
  {
    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.page.pageNumber = 0;
    this.page.size       = 12;

    this.selection = SelectionType.single;
  }


  ngOnInit(): void
  {
    this._inventoryService.onDataLoaded
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


  onSelectDT( op : any )
  {
    this._router.navigate(['/inventory/' + op]);
  }


  go( op : any )
  {
    this._router.navigate(['/inventory/' + op]);
  }


}
