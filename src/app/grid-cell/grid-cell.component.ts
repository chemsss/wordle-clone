import { Component, OnInit, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { GridCell } from '../models/grid-cell';

@Component({
  selector: 'app-grid-cell',
  imports: [ NgClass ],
  templateUrl: './grid-cell.component.html',
  styleUrl: './grid-cell.component.scss'
})
export class GridCellComponent {

  @Input() gridCell!: GridCell;
  @Input() activeRow!: boolean;

  ngOnInit() {
    
  }

}
