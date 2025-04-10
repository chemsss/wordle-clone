import { Injectable } from '@angular/core';

import { Grid } from '../models/grid';

import { UtilsService } from './utils.service';

const acceptedLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-'";

@Injectable({
  providedIn: 'root'
})

export class GridService {
  
  grid!: Grid;

  //constructor() { };

  constructor(private utilsService: UtilsService) {
    try {
      const wordOfTheDay = utilsService.getWordOfTheDay();
      //console.log(wordOfTheDay);
      let giveLetters = utilsService.getApostrophesAndHyphensIndices(wordOfTheDay);
      giveLetters.push(0);
      this.grid = new Grid(wordOfTheDay, true, giveLetters, true);
      if(this.utilsService.checkIfGameSaved(new Date())) {
        this.grid = this.utilsService.loadTodaysGame(this.grid);
      }
    } catch(err) {
      console.log(err);
      alert("Une erreur est survenue.");
    }
    
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
    let displayWordCopy = grid.gridRows[grid.activeRow].displayWord;

    // only typing in uppercase
    key = key.toUpperCase();

    if(grid.activeColumn < grid.wordToGuessLength) {

      if(grid.lockGivenLetters == false || ( grid.giveLetter == true && !grid.giveLetterIndices.includes(grid.activeColumn) ))  {
        displayWordCopy = this.utilsService.replaceAt(displayWordCopy, grid.activeColumn, key);
        grid.incrementActiveColumn();
      } else {
        if(this.utilsService.findNextNonLockedLetter(grid.activeColumn, displayWordCopy.length, grid.giveLetterIndices) != -1) {
          grid.setActiveColumn(this.utilsService.findNextNonLockedLetter(grid.activeColumn, displayWordCopy.length, grid.giveLetterIndices));
          displayWordCopy = this.utilsService.replaceAt(displayWordCopy, grid.activeColumn, key);
          grid.incrementActiveColumn();
        }
      }
    }

    // Refresh word to display on active row
    grid.gridRows[this.grid.activeRow].setDisplayWord(displayWordCopy);

    return grid;
  }
  

  deleteLetter(grid: Grid): Grid {
    let displayWordCopy = grid.gridRows[this.grid.activeRow].displayWord;

    if(grid.activeColumn >= 0) {
      if(grid.lockGivenLetters == false || ( grid.giveLetter == true && !grid.giveLetterIndices.includes(grid.activeColumn-1) )) {
        displayWordCopy = this.utilsService.replaceAt(displayWordCopy, grid.activeColumn-1, ".");
        if(grid.activeColumn > 0) {
          grid.decrementActiveColumn();
        }
      } else {
        if(this.utilsService.findPreviousNonLockedLetter(grid.activeColumn, displayWordCopy.length, grid.giveLetterIndices) != -1) {
          grid.setActiveColumn(this.utilsService.findPreviousNonLockedLetter(grid.activeColumn, displayWordCopy.length, grid.giveLetterIndices) + 1);
          displayWordCopy = this.utilsService.replaceAt(displayWordCopy, grid.activeColumn-1, ".");
          if(grid.activeColumn > 0) {
            grid.decrementActiveColumn();
          }
        }
      }
    }
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


  // This function first checks the letters that are the same and in the same position in both words, and then checks, for every letter of the user's guess, if it the letter is present in the word to guess while ignoring the already found correct position letters (I hope this explanation makes sense)
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
      grid.setActiveColumn(0);
    } else {
      grid = this.lostGame(grid);
    }
    return grid;
  }

  wonGame(grid: Grid): Grid {
    grid.won = true;
    grid.listenKeyboard = false;
    // Open Here You Won Modal
    alert("Félicitations ! Vous avez trouvé le mot du jour !\n\nRevenez demain pour le prochain mot !");
    this.utilsService.saveGame(grid.wordToGuess, grid.gridRows, true);
    return grid;
  }

  lostGame(grid: Grid): Grid {
    grid.lost = true;
    grid.listenKeyboard = false;
    // Open Here You Lost Modal
    alert("Vous avez perdu ! Le mot était : " +grid.wordToGuess +".\n\nBien essayé, retentez demain !");
    this.utilsService.saveGame(grid.wordToGuess, grid.gridRows, false);
    return grid;
  }
  
}