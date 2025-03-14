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

  giveLetter!: boolean; // When this is active, we give the first letter of the word to the user, that he cannot delete
  giveLetterIndex!: number;


  constructor() {
    this.wordToGuess = "EXACERBES";  // Temporary hard coded values
    this.wordToGuessLength = this.wordToGuess.length;
    this.numberOfChances = 6;
    this.guesses = [];
    this.activeRow = 0;
    this.won = false;
    this.lost = false;
    this.listenKeyboard = true;
    this.giveLetter = true;
    this.giveLetterIndex = 0;

    this.gridRows = [];
    for(let i=0; i < this.numberOfChances; i++) {
      if(this.giveLetter) {
        // Give first letter to user
        this.gridRows.push( 
          new GridRow(this.wordToGuessLength).giveACorrectLetter(this.wordToGuess.charAt(this.giveLetterIndex), this.giveLetterIndex) 
        );
      } else {
        this.gridRows.push(new GridRow(this.wordToGuessLength));
      }
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
