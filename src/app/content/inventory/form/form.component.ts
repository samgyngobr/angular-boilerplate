import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { InventoryService } from '../inventory.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector      : 'app-inventory-form',
  templateUrl   : './form.component.html',
  styleUrls     : ['./form.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class FormComponent implements OnInit, OnDestroy
{

  form  : FormGroup;
  id    : any;
  title : string = '';
  types : any    = null;


  // Private
  private _unsubscribeAll: Subject<any>;

  @ViewChild(FormGroupDirective) myForm : any;


  /**
   * Constructor
   *
   * @param {ActivatedRoute} _route
   * @param {FormBuilder} _formBuilder
   * @param {InventoryService} _inventoryService
   * @param {LoadingService} _loadingService
   * @param {NotifyService} _notifyService
   */
   constructor(
    private _route            : ActivatedRoute,
    private _formBuilder      : FormBuilder,
    private _inventoryService : InventoryService,
    private _loadingService   : LoadingService,
    private _notifyService    : NotifyService,
  )
  {
    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.id = this._route.snapshot.params.id

    if( this.id == 'new' )
      this.title = "Novo";

    // declare form
    this.form = this._formBuilder.group({
      title : ['', Validators.required],
      type  : ['', Validators.required],
    });

  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ngOnInit(): void
  {
    this._inventoryService.onIdDataLoaded
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe( res => {

        this.types = res.form.types

        if( this.id != 'new' )
        {
          this.title = res.data.title

          this.form.controls['title'].setValue( res.data.title );
          this.form.controls['type' ].setValue( parseInt( res.data.type ) );
        }

      });
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



   submit()
   {
    if (this.form.invalid)
      return

    this._loadingService.show();

    this._inventoryService.saveContent( this.id, this.form.value )
      .then( r => {

        if( this.id == 'new' || this.id == null )
          this.myForm.resetForm();

        this._loadingService.hide();
        this._notifyService.success( r.message );

      })
      .catch( err => {

        this._loadingService.hide();
        this._notifyService.error( err.message );

      });
   }


   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 }