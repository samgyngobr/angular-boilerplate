import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService
{

  /**
   * Constructor
   *
   * @ param {AuthenticationService} _authenticationService
   * @param {MatSnackBar} _snackBar
   */
  constructor(private _snackBar: MatSnackBar)
  {
  }


  error( msg : string )
  {
    this.notify( msg, 'mat-warn' )
  }


  success( msg : string )
  {
    this.notify( msg, 'mat-accent' )
  }


  notify( msg : string, type : string )
  {
    this._snackBar.open( msg, undefined, {
      duration          : 8000,
      horizontalPosition: 'end',
      verticalPosition  : 'bottom',
      panelClass        : [ 'mat-toolbar', type ]
    });
  }


}
