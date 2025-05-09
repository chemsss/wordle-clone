import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

import { GridService } from '../services/grid.service';

import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-keyboard-key',
  imports: [ MatIconModule, NgClass ],
  templateUrl: './keyboard-key.component.html',
  styleUrl: './keyboard-key.component.scss'
})
export class KeyboardKeyComponent {

  @Input() key!: string;

  constructor(private gridService: GridService) { };

  isLetterNotPresent(): boolean {
    if(this.gridService.grid.notPresentLetters.includes(this.key)) {
      return true;
    } else {
      return false;
    }
  }

  handleKeyPress(event: Event): void {
    (event.target as HTMLElement).blur();
    this.gridService.handleKey(this.key);
  }

}
