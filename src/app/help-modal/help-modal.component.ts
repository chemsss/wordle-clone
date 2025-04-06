import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { GridCellComponent } from '../grid-cell/grid-cell.component';

import { GridCell } from '../models/grid-cell';

@Component({
  selector: 'app-help-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, GridCellComponent],
  templateUrl: './help-modal.component.html',
  styleUrl: './help-modal.component.scss',
})
export class HelpModalComponent {
  constructor(private dialogRef: MatDialogRef<HelpModalComponent>) {}

  correctCell!: GridCell;
  wrongPosCell!: GridCell;
  notPresentCell!: GridCell;

  ngOnInit() {
    this.correctCell = new GridCell();
    this.wrongPosCell = new GridCell();
    this.notPresentCell = new GridCell();

    this.correctCell.setExample();
    this.correctCell.setCorrect();
    this.correctCell.setDisplayedLetter("A");

    this.wrongPosCell.setExample();
    this.wrongPosCell.setWrongPosition();
    this.wrongPosCell.setDisplayedLetter("B");

    this.notPresentCell.setExample();
    this.notPresentCell.setNotPresent();
    this.notPresentCell.setDisplayedLetter("C");
  }

  close() {
    this.dialogRef.close();
  }
}
