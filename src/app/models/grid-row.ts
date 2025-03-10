import { throws } from "assert";
import { GridCell } from "./grid-cell";
import { LetterStatus } from "./letter-status";

export class GridRow {
  displayWord: string;
  rowCells!: GridCell[];
  active!: boolean; // false = empty, true = row active or has been active

  constructor(numberOfLetters: number, displayWord?: string) {
    //create cells depending of number of letters
    this.rowCells = [];
    for(let i = 0; i< numberOfLetters; i++) this.rowCells.push(new GridCell()); 

    // if a word is specified set guessword variable to that word, else set the variable to a string with dots
    if(displayWord) {
      this.displayWord = displayWord;
      this.active = true;
    } else {
      this.displayWord = "";
      for(let i=0; i < numberOfLetters; i++) this.displayWord += ".";
      this.active = false;
    }

    // Set the letters to display in the cells depending on the word
    this.setDisplayWord(this.displayWord);
    
  }

  setCellStatus(i: number, status: LetterStatus): void {
    switch(status) {
      case "correct": 
        this.rowCells[i].setCorrect();
        break;
      case "wrong-position":
        this.rowCells[i].setWrongPosition();
        break;
      case "not-present":
        this.rowCells[i].setNotPresent();
        break;
    }
  }

  setDisplayWord(word: string): void {
    this.displayWord = word;
    for(let i = 0; i< this.rowCells.length; i++) {
      this.rowCells[i].setDisplayedLetter(word.charAt(i));
    }
  }

}
