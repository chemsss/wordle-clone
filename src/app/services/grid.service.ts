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
      displayWordCopy = displayWordCopy.replace(".", key);
    }

    // Refresh word to display on active row
    grid.gridRows[this.grid.activeRow].setDisplayWord(displayWordCopy);

    return grid;
  }
  

  deleteLetter(grid: Grid): Grid {
    let displayWordCopy = grid.gridRows[this.grid.activeRow].displayWord;

    // If word is not full
    if(displayWordCopy.includes(".")) {
      // Check if the word is full of dots (otherwise it will add more dots)
      if(displayWordCopy.split(".").length-1 < displayWordCopy.length) {
        // Restrict deletion of first letter if we give the first letter to the user
        if( !(grid.giveLetter == true && displayWordCopy.indexOf(".") == grid.giveLetterIndex+1) ) {
          // Find index of first "." in the word, and replace the character right before it by a "."
        displayWordCopy = displayWordCopy.substring(0, displayWordCopy.indexOf(".")-1) + "." + displayWordCopy.substring(displayWordCopy.indexOf(".")-1 + 1);
        }
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
      //alert("Le mot est incomplet !");
    } else {
      if(displayWordCopy == this.grid.wordToGuess) {
        grid = this.goodGuess(grid);
        alert("Félicitations ! Vous avez trouvé le mot ! BJ BG");
      } else {
        grid = this.wrongGuess(grid);
        //alert("Mauvais mot loser");
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


  // This function first checks the letters that are the same and in the same position in both words, and then checks, for every letter of the user's guess, if it the letter is present in the word to guess while ignoring the already found correct position letters (I hope this this explanation makes sense)
  wrongGuess(grid: Grid): Grid {
    let gridRowCopy = grid.gridRows[grid.activeRow];

    let wordToGuessCopy = grid.wordToGuess;
    let guessCopy = gridRowCopy.displayWord;

    let correctLetterPositionIndexes = [];

    // As a priority, we first check for all correct letters that are in the right position
    // Go through each letter of the word entered
    for(let i=0; i<grid.wordToGuessLength; i++) {
      let letter = guessCopy[i];

      // If the letter is present in the word to guess
      if(wordToGuessCopy.includes(letter)) {
        // If the letter is present at the same position in the word to guess
        if(wordToGuessCopy.charAt(i) == guessCopy.charAt(i)) {          
          // Set cell of the letter to correct (for the css)
          gridRowCopy.setCellStatus(i, "correct");
          correctLetterPositionIndexes.push(i);
        }
      }
      // To not bias the "includes(letter)" function call, remove already checked letter from the words
      guessCopy = guessCopy.substring(0, i) + " " + guessCopy.substring(i + 1);
      wordToGuessCopy = wordToGuessCopy.substring(0, i) + " " + wordToGuessCopy.substring(i + 1);
    }


    // Reset the words but remove letters that are in the correct position
    guessCopy = gridRowCopy.displayWord;
    wordToGuessCopy = grid.wordToGuess;
    for(let i=0; i<correctLetterPositionIndexes.length; i++) {
      // Replace only letters that we have found in the correct position by a blank, to ignore them in the following checks while not altering the indexes
      guessCopy = guessCopy.substring(0, correctLetterPositionIndexes[i]) + " " + guessCopy.substring(correctLetterPositionIndexes[i] + 1);
      wordToGuessCopy = wordToGuessCopy.substring(0, correctLetterPositionIndexes[i]) + " " + wordToGuessCopy.substring(correctLetterPositionIndexes[i] + 1);
    }


    // Now we do the same for incorrect letters and letters that are in the wrong position
    for(let i=0; i<grid.wordToGuessLength; i++) {
      let letter = guessCopy[i];

      if(!correctLetterPositionIndexes.includes(i)) {
        if(wordToGuessCopy.includes(letter)) {
          // We have already checked for all correct letters in the right position so any letter found at this point is at the wrong position
          gridRowCopy.setCellStatus(i, "wrong-position");          
          // If current letter found, remove it from word to guess
          wordToGuessCopy = wordToGuessCopy = wordToGuessCopy.replace(letter, " ");
        } else  {
          gridRowCopy.setCellStatus(i, "not-present");
        }
      }
    }

    // Go to next turn if it wasn't the last try
    grid = this.nextTurn(grid);

    return grid;
  }
  

  nextTurn(grid: Grid): Grid {
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