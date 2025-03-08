import { GridCell } from "./grid-cell";

export class GridRow {
  displayWord: string;
  rowCells!: GridCell[];
  status!: boolean; // false = empty, true = already used row

  constructor(numberOfLetters: number, displayWord?: string) {
    //create cells depending of number of letters
    this.rowCells = [];
    for(let i = 0; i< numberOfLetters; i++) this.rowCells.push(new GridCell()); 

    // if a word is specified set guessword variable to that word, else set the variable to a string with dots
    if(displayWord) {
      this.displayWord = displayWord;
      this.status = true;
    } else {
      this.displayWord = "";
      for(let i=0; i < numberOfLetters; i++) this.displayWord += ".";
      this.status = false;
    }

    // Set the letters to display in the cells depending on the word
    this.setDisplayWord(this.displayWord);
    
  }

  setDisplayWord(word: string): void {
    this.displayWord = word;
    for(let i = 0; i< this.rowCells.length; i++) {
      this.rowCells[i].setDisplayedLetter(word.charAt(i));
    }
  }

}
