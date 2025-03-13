import { GridRow } from './grid-row';

export class Grid {
  
  gridRows!: GridRow[];

  numberOfChances!: number;

  wordToGuess!: string;
  wordToGuessLength!: number;

  guesses!: string[];

  activeRow!: number;
  activeGuess!: string;

  won!: boolean;
  lost!: boolean;

  listenKeyboard!: boolean;


  constructor() {
    this.wordToGuess = "TRANSMISSION";  // Temporary hard coded values
    this.wordToGuessLength = this.wordToGuess.length;
    this.numberOfChances = 6;
    this.guesses = [];
    this.activeRow = 0;
    this.won = false;
    this.lost = false;
    this.listenKeyboard = true;

    this.gridRows = [];
    for(let i=0; i < this.numberOfChances; i++) {
      this.gridRows.push(new GridRow(this.wordToGuessLength));
    }
    this.gridRows[0].active = true;
  }

  setActiveGuess(guess: string) {
    this.gridRows[this.activeRow].setDisplayWord(guess);
  }

  resetActiveGuess(): void {
    let rowOfDots = "";
    for(let i=0; i < this.wordToGuessLength; i++) rowOfDots += ".";
    this.gridRows[this.activeRow].setDisplayWord(rowOfDots);
  }

  incrementActiveRow(): void {
    this.gridRows[this.activeRow+1].active = true;
    this.activeRow++;
  }

  setNumberOfChances(number: number): void {
    this.numberOfChances = number;
  }

}
