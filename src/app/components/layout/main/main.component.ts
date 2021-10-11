import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit
{
  @ViewChild('drawer') public drawer!: MatSidenav;

  constructor( private _sidebarService: SidebarService )
  {
  }

  ngOnInit()
  {
    this._sidebarService.sideNavToggleSubject.subscribe( () => {
      this.drawer?.toggle();
    });
  }

}
