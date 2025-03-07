import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';

import { GridRowComponent } from './grid-row/grid-row.component';

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, GridRowComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wordle-clone';
}
