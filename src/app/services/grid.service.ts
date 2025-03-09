import { Injectable } from '@angular/core';

import { GridRow } from '../models/grid-row';

const acceptedLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

@Injectable({
  providedIn: 'root'
})

export class GridService {

  wordToGuess!: string;
  numberOfChances!: number;

  guesses!: string[];

  activeRow!: number;
  activeGuess!: string;

  constructor() {
    this.wordToGuess = "ABASOURDIT";
    this.numberOfChances = 6;
    this.guesses = [];
    this.activeRow = 0;
  }

  handleKey(gridRows: GridRow[], key:string): GridRow[] {

    let displayWordCopy = gridRows[this.activeRow].displayWord;

    // If the key is a letter
    if(acceptedLetters.includes(key)) {
      // If word contains ".", replace first "." by the typed letter, else do nothing because the word is full
      if(displayWordCopy.includes(".")) {
        displayWordCopy = displayWordCopy.replace(".", key)
      }

      // If the key is Backspace (to delete last typed letter)
    } else if(key == "Backspace") {
      // If word is not full
      if(displayWordCopy.includes(".")) {
        // Check if the word is full of dots (otherwise it will add more dots than there are letters in the word to guess)
        if(displayWordCopy.split(".").length-1 < displayWordCopy.length) {
          // Find index of first "." in the word, and replace the character right before it by a "."
          displayWordCopy = displayWordCopy.substring(0, displayWordCopy.indexOf(".")-1) + "." + displayWordCopy.substring(displayWordCopy.indexOf(".")-1 + 1);
        }
      } else {
        // If there is no "." just replace last char by "."
        displayWordCopy = displayWordCopy.substring(0, displayWordCopy.length-1) + ".";        
      }

      // If the key is Enter (to make a guess)
    } else if(key == "Enter") {
      if(displayWordCopy.includes(".")) {
        alert("Le mot est incomplet !");
      } else {
        if(displayWordCopy == this.wordToGuess) {
          alert("Félicitations ! Vous avez trouvé le mot ! BJ BG");
        } else {
          alert("Mauvais mot loser");
        }
      }
    }

    // Refresh word to display on active row
    gridRows[this.activeRow].setDisplayWord(displayWordCopy);

    return gridRows;
  }
  
}