import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { DayCountdownComponent } from '../day-countdown/day-countdown.component';

import { HelpModalComponent } from '../help-modal/help-modal.component'; // adjust path as needed

@Component({
  selector: 'app-header',
  imports: [ RouterLink, DayCountdownComponent ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  openModal() {
    this.dialog.open(HelpModalComponent, {
      width: '1000px',
      panelClass: 'help-dialog-container'
    });
  }
}
