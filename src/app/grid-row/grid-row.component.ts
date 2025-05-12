import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { GridRow } from '../models/grid-row';

import { GridCellComponent } from '../grid-cell/grid-cell.component';

import { Grid } from '../models/grid';

import { GridService } from '../services/grid.service';

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

  //nonActiveGridRow!: GridRow; // We use this for non used/non active rows

  loading: boolean = true;

  constructor(private gridService: GridService,
    private cdRef: ChangeDetectorRef
) { };

  ngOnInit() {
    //this.nonActiveGridRow = new GridRow(this.numberOfColumns);
    this.cdRef.detectChanges();
    this.loading = false;
  }

  getGrid(): Grid {
    return this.gridService.grid;
  }

  getServiceLoading(): boolean {
    return this.gridService.loading;
  }

}
