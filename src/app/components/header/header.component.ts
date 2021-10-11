import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private _sidebarService : SidebarService ) 
  { 
  }

  ngOnInit(): void {
  }

  sidebarToggle()
  {
    this._sidebarService.toggle();
  }

}
