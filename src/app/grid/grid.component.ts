import { Component, HostListener, ChangeDetectorRef   } from '@angular/core';

import { GridRowComponent } from '../grid-row/grid-row.component';

import { Grid } from '../models/grid';

import { GridService } from '../services/grid.service';

@Component({
  selector: 'app-grid',
  imports: [ GridRowComponent ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  constructor(private gridService: GridService,
              private cdRef: ChangeDetectorRef
    ) { };
  
  grid!: Grid;

  ngOnInit() {
    this.grid = this.gridService.grid;
    this.cdRef.detectChanges();
    console.log("Today's word length: ", this.grid.wordToGuessLength);
    console.log("Today's word : ", this.grid.wordToGuess);
  }

  // keyboard listener (keyup = when key is released)
  @HostListener('document:keyup', ['$event'])
  onKeyup(event: KeyboardEvent) {
    if(this.grid.won == false && this.grid.lost == false) {
      //console.log(event);
      this.grid = this.gridService.handleKey(this.grid, event.key);
    }
    
  }


}
