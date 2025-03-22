import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { DayCountdownComponent } from '../day-countdown/day-countdown.component';

@Component({
  selector: 'app-header',
  imports: [ RouterLink, DayCountdownComponent ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
