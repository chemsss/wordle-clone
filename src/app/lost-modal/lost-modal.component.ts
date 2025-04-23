import { Component, ChangeDetectorRef, Inject } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-lost-modal',
  imports: [MatDialogModule],
  templateUrl: './lost-modal.component.html',
  styleUrl: './lost-modal.component.scss'
})
export class LostModalComponent {
  constructor(private dialogRef: MatDialogRef<LostModalComponent>,
              private cdRef: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: {wordToGuess: string}
              ) {}


  ngOnInit() {
    this.cdRef.detectChanges();
  }

  close() {
    this.dialogRef.close();
  }

}
