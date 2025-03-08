import { LetterStatus } from "./letter-status";

export class GridCell {
  displayedLetter: string;
  status!: LetterStatus;

  constructor() {
    this.displayedLetter = ".";
    this.status = "idle";
  }

  setDisplayedLetter(letter: string): void {
    this.displayedLetter = letter;
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


}