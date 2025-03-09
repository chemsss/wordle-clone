import { Component, HostListener  } from '@angular/core';

import { GridRowComponent } from '../grid-row/grid-row.component';
import { GridRow } from '../models/grid-row';

import { GridService } from '../services/grid.service';

@Component({
  selector: 'app-grid',
  imports: [ GridRowComponent ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  constructor(private gridService: GridService) { };

  wordToGuess!: string;
  numberOfChances!: number;

  guesses!: string[];

  activeRow!: number;
  activeGuess!: string;

  gridRows!: GridRow[];

  ngOnInit() {
    this.wordToGuess = this.gridService.wordToGuess;
    this.numberOfChances = this.gridService.numberOfChances;

    this.gridRows = [];
    for(let i=0; i < this.numberOfChances; i++) {
      this.gridRows.push(new GridRow(this.wordToGuess.length))
    }
    //this.gridRows[0].setDisplayWord(this.wordToGuess);

  }


  // Listener just for one key
  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent) {
    // some logic here
    //console.log(event);
    this.gridRows = this.gridService.handleKey(this.gridRows, event.key);
  }


}
