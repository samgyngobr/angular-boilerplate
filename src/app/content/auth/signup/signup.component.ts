import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

@Component({
  selector      : 'app-signup',
  templateUrl   : './signup.component.html',
  styleUrls     : ['./signup.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class SignupComponent implements OnInit, OnDestroy
{

  public loginForm : FormGroup;
  private _unsubscribeAll: Subject<any>


  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   * @param {Router} _router
   */
  constructor(
    private _router      : Router,
    private _formBuilder : FormBuilder,
  )
  {
    this._unsubscribeAll = new Subject();

    this.loginForm = this._formBuilder.group({
      name            : ['', Validators.required],
      email           : ['', [Validators.required, Validators.email]],
      password        : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      passwordConfirm : ['', [Validators.required, confirmPasswordValidator]]
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
  }


}


/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
 export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if ( !control.parent || !control )
  {
      return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if ( !password || !passwordConfirm )
  {
      return null;
  }

  if ( passwordConfirm.value === '' )
  {
      return null;
  }

  if ( password.value === passwordConfirm.value )
  {
      return null;
  }

  return {passwordsNotMatching: true};
};
