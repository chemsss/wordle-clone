import { LetterStatus } from "./letter-status";

export class GridCell {
  guessedLetter: string;
  status!: LetterStatus;

  constructor() {
    this.guessedLetter = "";
    this.status = "idle";
  }

  setGuessedLetter(letter: string): void {
    this.guessedLetter = letter;
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