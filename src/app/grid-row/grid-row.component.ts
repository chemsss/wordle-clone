import { Component, OnInit, Input } from '@angular/core';

import { GridRow } from '../models/grid-row';

import { GridCellComponent } from '../grid-cell/grid-cell.component';

@Component({
  selector: 'app-grid-row',
  imports: [ GridCellComponent ],
  templateUrl: './grid-row.component.html',
  styleUrl: './grid-row.component.scss'
})
export class GridRowComponent {

  @Input() guessedWord!: string;
  @Input() numberOfColumns!: number;

  gridRow!: GridRow;

  ngOnInit() {
    this.gridRow = new GridRow(this.numberOfColumns);
    if(this.guessedWord) {
      this.gridRow.setGuessedWord(this.guessedWord);
    }
    
  }

}
