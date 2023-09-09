import { Component } from '@angular/core';
import { SidebarItems } from '../../interfaces/sidebar.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [ ]
})
export class SidebarComponent {

  public sidebarItems: SidebarItems[] = [
    {
      text: 'Por capital',
      url: '/countries/by-capital',
      active: 'active'
    },
    {
      text: 'Por país',
      url: '/countries/by-country',
      active: 'active'
    },
    {
      text: 'Por región',
      url: '/countries/by-region',
      active: 'active'
    }
  ]

}
