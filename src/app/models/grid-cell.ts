import { LetterStatus } from "./letter-status";

export class GridCell {
  displayedLetter: string;
  status!: LetterStatus;
  filled!: boolean;
  example!: boolean;

  constructor() {
    this.displayedLetter = ".";
    this.status = "idle";
    this.filled = false;
    this.example = false;
  }

  setDisplayedLetter(letter: string, dontFill?: boolean): void {
    if(dontFill) {
      this.displayedLetter = letter;
    } else {
      if(letter == ".") {
        this.filled = false;
      } else {
        this.filled = true;
      }
      this.displayedLetter = letter;
    }
  }

  giveLetter(letter: string): void {
    this.displayedLetter = letter;
  }

  setFilled(): void {
    this.filled = true;
  }

  setCorrect(): void {
    this.status = "correct";
  }
  setWrongPosition(): void {
    this.status = "wrong-position";
  }
  setNotPresent(): void {
    this.status = "not-present";
  }
  
  setExample(): void {
    this.example = true;
  }


}