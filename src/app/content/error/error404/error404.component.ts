import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class Error404Component {

  constructor(private _location: Location)
  {}


  back()
  {
    this._location.back();
  }

}
