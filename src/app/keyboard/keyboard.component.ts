import { Component } from '@angular/core';

import { KeyboardKeyComponent } from '../keyboard-key/keyboard-key.component';

@Component({
  selector: 'app-keyboard',
  imports: [ KeyboardKeyComponent ],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent {

  getRow1(): string[] {
    return ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"];
  }

  getRow2(): string[] {
    return ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"];
  }

  getRow3(): string[] {
    return ["Backspace", "W", "X", "C", "V", "B", "N", "Enter"];
  }

}
