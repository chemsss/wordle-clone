import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { GridComponent } from './grid/grid.component';


@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, GridComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wordle-clone';
}
