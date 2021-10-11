import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { LoadingService } from '../../../services/loading.service';
import { NotifyService } from '../../../services/notify.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector      : 'app-signin',
  templateUrl   : './signin.component.html',
  styleUrls     : ['./signin.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class SigninComponent implements OnInit, OnDestroy
{

  public loginForm : FormGroup;
  private _unsubscribeAll : Subject<any>


  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   * @param {Router} _router
   * @param {LoadingService} _loadingService
   * @param {NotifyService} _notifyService
   * @param {AuthService} _authService
   */
  constructor(
    private _router         : Router,
    private _formBuilder    : FormBuilder,
    private _loadingService : LoadingService,
    private _notifyService  : NotifyService,
    private _authService    : AuthService
  )
  {
    this._unsubscribeAll = new Subject();

    this.loginForm = this._formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    });
  }


  ngOnInit(): void
  {
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


  onSubmit()
  {
    if (this.loginForm.invalid)
      return

    this._loadingService.show();

    this._authService.login( this.loginForm.controls.email.value, this.loginForm.controls.password.value )
      .pipe( first() )
      .subscribe( res => {

        this._loadingService.hide();
        this._router.navigate(['/']);

      }, er => {

        this._loadingService.hide();
        this._notifyService.error( er );

      });
  }


}
