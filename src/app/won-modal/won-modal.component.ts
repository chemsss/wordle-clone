import { Component, ChangeDetectorRef, Inject } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-won-modal',
  imports: [MatDialogModule],
  templateUrl: './won-modal.component.html',
  styleUrl: './won-modal.component.scss'
})
export class WonModalComponent {
  constructor(private dialogRef: MatDialogRef<WonModalComponent>,
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
