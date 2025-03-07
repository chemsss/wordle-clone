import { Component, OnInit, Input } from '@angular/core';
import { GridCell } from '../models/grid-cell';

@Component({
  selector: 'app-grid-cell',
  imports: [],
  templateUrl: './grid-cell.component.html',
  styleUrl: './grid-cell.component.scss'
})
export class GridCellComponent {

  @Input() gridCell!: GridCell;
  

  ngOnInit() {/*
    this.gridCell = new GridCell();
    if(this.letter) {
      this.gridCell.setGuessedLetter(this.letter);
    }
    console.log(this.gridCell.guessedLetter +"dazjaz\n")
    */
  }

}
