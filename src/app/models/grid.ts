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

  giveLetter!: boolean; // When this is active, it means that one or more letters in the word are given by default to the user as a help
  lockGivenLetters!: boolean; // If the user can type a different letter on top of a given letter or not
  giveLetterIndices!: number[];


  constructor(wordToGuess: string, giveLetter: boolean, giveLetterIndices: number[]) {
    //this.wordToGuess = "EXACERBES";  // Temporary hard coded values
    this.wordToGuess = wordToGuess;    
    this.wordToGuessLength = this.wordToGuess.length;
    this.numberOfChances = 6;
    this.guesses = [];
    this.activeRow = 0;
    this.won = false;
    this.lost = false;
    this.listenKeyboard = true;
    this.giveLetter = giveLetter;
    this.lockGivenLetters = false;
    this.giveLetterIndices = giveLetterIndices;

    this.gridRows = [];
    for(let i=0; i < this.numberOfChances; i++) {
      if(this.giveLetter) {
        let gridRow = new GridRow(this.wordToGuessLength);
        for(let i=0; i < giveLetterIndices.length ; i++) {
          gridRow.giveACorrectLetter(this.wordToGuess.charAt(this.giveLetterIndices[i]), this.giveLetterIndices[i])
        }
        this.gridRows.push(gridRow);
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
