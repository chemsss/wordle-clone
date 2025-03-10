import { Injectable } from '@angular/core';

import { Grid } from '../models/grid';

const acceptedLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

@Injectable({
  providedIn: 'root'
})

export class GridService {
  
  grid!: Grid;

  constructor() {
    this.grid = new Grid();
  }

  handleKey(grid: Grid, key:string): Grid {

    // If the key is a letter
    if(acceptedLetters.includes(key)) {
      this.grid = this.typeLetter(grid, key);

      // If the key is Backspace (to delete last typed letter)
    } else if(key == "Backspace") {
      this.grid = this.deleteLetter(grid);

      // If the key is Enter (to make a guess)
    } else if(key == "Enter") {
      this.grid = this.makeAGuess(grid);
    }    

    return this.grid;
  }


  typeLetter(grid: Grid, key: string): Grid {
    let displayWordCopy = grid.gridRows[this.grid.activeRow].displayWord;

    // only typing in uppercase
    key = key.toUpperCase();
    // If word contains ".", replace first "." by the typed letter, else do nothing because the word is full
    if(displayWordCopy.includes(".")) {
      displayWordCopy = displayWordCopy.replace(".", key)
    }

    // Refresh word to display on active row
    grid.gridRows[this.grid.activeRow].setDisplayWord(displayWordCopy);

    return grid;
  }

  deleteLetter(grid: Grid): Grid {
    let displayWordCopy = grid.gridRows[this.grid.activeRow].displayWord;

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

    // Refresh word to display on active row
    grid.gridRows[this.grid.activeRow].setDisplayWord(displayWordCopy);

    return grid;
  }

  makeAGuess(grid: Grid): Grid {
    let displayWordCopy = grid.gridRows[this.grid.activeRow].displayWord;

    if(displayWordCopy.includes(".")) {
      alert("Le mot est incomplet !");
    } else {
      if(displayWordCopy == this.grid.wordToGuess) {
        grid = this.goodGuess(grid);
        alert("Félicitations ! Vous avez trouvé le mot ! BJ BG");
      } else {
        grid = this.wrongGuess(grid);
        alert("Mauvais mot loser");
      }
    }

    return grid;
  }



  goodGuess(grid: Grid): Grid {
    for(let i=0; i<grid.wordToGuessLength; i++) {
      grid.gridRows[grid.activeRow].setCellStatus(i, "correct");
    }
    grid = this.wonGame(grid);

    return grid;
  }



  wrongGuess(grid: Grid): Grid {
    let gridRowCopy = grid.gridRows[grid.activeRow];

    let wordToGuessCopy = grid.wordToGuess;
    let guessCopy = gridRowCopy.displayWord;

    //Go through each letter of the word entered
    for(let i=0; i<grid.wordToGuessLength; i++) {
      let letter = guessCopy[i];

      // If the letter is present in the word to guess
      if(wordToGuessCopy.includes(letter)) {
        // If the index of the letter is the same of both word to guess and the active guess
        if(wordToGuessCopy.indexOf(letter) == guessCopy.indexOf(letter)) {
          // Set cell of the letter to correct (for the css)
          gridRowCopy.setCellStatus(i, "correct");
        } else {
          // Same for a correct letter but that is not in the right position
          gridRowCopy.setCellStatus(i, "wrong-position");
        }
      } else {
        gridRowCopy.setCellStatus(i, "not-present");
      }

      // We replace the found letter in both words with a blank space, for the index and include searches to not be biased by previous letters
      wordToGuessCopy = wordToGuessCopy.replace(letter, " ");
      guessCopy = guessCopy.replace(letter, " ");
    }

    // If it is not the last try
    if(grid.activeRow < grid.numberOfChances-1) {
      // Increment active row and set the row to used
      grid.incrementActiveRow();
    } else {
      grid = this.lostGame(grid);
    }

    return grid;
  }

  wonGame(grid: Grid): Grid {
    grid.won = true;
    grid.listenKeyboard = false;
    return grid;
  }

  lostGame(grid: Grid): Grid {
    grid.lost = true;
    grid.listenKeyboard = false;
    return grid;
  }
  
}