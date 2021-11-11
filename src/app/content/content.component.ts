import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit
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
