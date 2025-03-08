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

  @Input() active!: boolean;  // Currently used row or not
  @Input() numberOfColumns!: number;  // Number of cells, should be the same for every row
  @Input() gridRow!: GridRow; // Row object, one for every row

}
