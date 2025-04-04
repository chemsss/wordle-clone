import { LetterStatus } from "./letter-status";

export class GridCell {
  displayedLetter: string;
  status!: LetterStatus;
  filled!: boolean;

  constructor() {
    this.displayedLetter = ".";
    this.status = "idle";
    this.filled = false;
  }

  setDisplayedLetter(letter: string): void {
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


}