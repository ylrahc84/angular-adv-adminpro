import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItem: any[];

  constructor( private sidebarService: SidebarService ) { 

    this.menuItem = sidebarService.menu;

  }

  ngOnInit(): void {
  }

}
