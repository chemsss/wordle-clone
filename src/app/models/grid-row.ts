import { GridCell } from "./grid-cell";

export class GridRow {
  guessedWord: string;
  rowCells!: GridCell[];
  status!: boolean; // false = empty, true = already used row

  constructor(numberOfLetters: number) {
    this.rowCells = [];
    for(let i = 0; i< numberOfLetters; i++) this.rowCells.push(new GridCell()); 
    this.guessedWord = "";
    this.status = false;
  }

  setGuessedWord(word: string): void {
    this.guessedWord = word;
    for(let i = 0; i< this.rowCells.length; i++) {
      this.rowCells[i].setGuessedLetter(word.charAt(i));
    }
  }

}
