import { Component } from '@angular/core';

import { GridRowComponent } from '../grid-row/grid-row.component';
import { GridRow } from '../models/grid-row';

@Component({
  selector: 'app-grid',
  imports: [ GridRowComponent ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  wordToGuess!: string;
  numberOfChances!: number;

  guesses!: string[];
  activeRow!: number;

  gridRows!: GridRow[];

  ngOnInit() {
    this.wordToGuess = "ABASOURDIT";
    this.numberOfChances = 6;
    this.guesses = [];
    this.activeRow = 1;

    this.gridRows = [];
    for(let i=0; i < this.numberOfChances; i++) {
      this.gridRows.push(new GridRow(this.wordToGuess.length))
    }
    //this.gridRows[0].setDisplayWord(this.wordToGuess);




  }


}
