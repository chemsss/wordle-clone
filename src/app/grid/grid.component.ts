import { Component, HostListener, ChangeDetectorRef   } from '@angular/core';

import { NgClass } from '@angular/common';

import { GridRowComponent } from '../grid-row/grid-row.component';

import { KeyboardComponent } from '../keyboard/keyboard.component';

import { Grid } from '../models/grid';

import { GridService } from '../services/grid.service';

@Component({
  selector: 'app-grid',
  imports: [ NgClass, GridRowComponent, KeyboardComponent ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  constructor(private gridService: GridService,
              private cdRef: ChangeDetectorRef
    ) { };
  
  loading: boolean = true;

  ngOnInit() {
    this.cdRef.detectChanges();
    this.loading = false;
  }

  // keyboard listener (keyup = when key is released)
  @HostListener('document:keyup', ['$event'])
  onKeyup(event: KeyboardEvent) {
    if(this.getGrid().won == false && this.getGrid().lost == false) {
      //console.log(event);
      this.gridService.handleKey(event.key);
    }
  }

  getGrid(): Grid {
    return this.gridService.grid;
  }

  getServiceLoading(): boolean {
    return this.gridService.loading;
  }

}
