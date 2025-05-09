import { Injectable } from '@angular/core';

import { Grid } from '../models/grid';

import { UtilsService } from './utils.service';

import { LostModalComponent } from '../lost-modal/lost-modal.component';
import { WonModalComponent } from '../won-modal/won-modal.component';
import { MatDialog } from '@angular/material/dialog';

const acceptedLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-'";

@Injectable({
  providedIn: 'root'
})

export class GridService {
  
  grid!: Grid;

  loading: boolean = true;

  //constructor() { };

  constructor(private utilsService: UtilsService,
              private dialog: MatDialog) {
    try {
      const wordOfTheDay = utilsService.getWordOfTheDay();
      //console.log(wordOfTheDay);
      let giveLetters = utilsService.getApostrophesAndHyphensIndices(wordOfTheDay);
      giveLetters.push(0);
      this.grid = new Grid(wordOfTheDay, true, giveLetters, true);
      this.grid = this.checkGameSave(this.grid);
      this.loading = false;
    } catch(err) {
      console.log(err);
      this.loading = false;
      alert("Une erreur est survenue.");
    }
    
  }


  checkGameSave(grid: Grid): Grid {
    if(this.utilsService.checkIfGameSaved(new Date())) {
      grid = this.utilsService.loadTodaysGame(grid);
      if(this.grid.lost == true) {
        grid = this.lostGame(grid);
      } else if(this.grid.won == true) {
        grid = this.wonGame(grid);
      }
    }
    return grid;
  }


  handleKey(key:string): void {

    // If the key is a letter
    if(acceptedLetters.includes(key)) {
      this.grid = this.typeLetter(this.grid, key);

      // If the key is Backspace (to delete last typed letter)
    } else if(key == "Backspace") {
      this.grid = this.deleteLetter(this.grid);

      // If the key is Enter (to make a guess)
    } else if(key == "Enter") {
      this.grid = this.makeAGuess(this.grid);
    }    

  }


  typeLetter(grid: Grid, key: string): Grid {
    // Not removing comments here for now because I'm scared something could break at some specific situation because I am now handling only the letter that we want to change for displayWord
    let displayWordCopy = grid.gridRows[grid.activeRow].displayWord;

    // only typing in uppercase
    key = key.toUpperCase();

    if(grid.activeColumn < grid.wordToGuessLength) {

      if(grid.lockGivenLetters == false || ( grid.giveLetter == true && !grid.giveLetterIndices.includes(grid.activeColumn) ))  {
        //displayWordCopy = this.utilsService.replaceAt(displayWordCopy, grid.activeColumn, key);
        grid.gridRows[this.grid.activeRow].setDisplayWord(this.utilsService.replaceAt(displayWordCopy, grid.activeColumn, key), true);
        grid.gridRows[this.grid.activeRow].rowCells[grid.activeColumn].setDisplayedLetter(key);
        grid.incrementActiveColumn();
      } else {
        if(this.utilsService.findNextNonLockedLetter(grid.activeColumn, displayWordCopy.length, grid.giveLetterIndices) != -1) {
          grid.setActiveColumn(this.utilsService.findNextNonLockedLetter(grid.activeColumn, displayWordCopy.length, grid.giveLetterIndices));
          //displayWordCopy = this.utilsService.replaceAt(displayWordCopy, grid.activeColumn, key);
          grid.gridRows[this.grid.activeRow].setDisplayWord(this.utilsService.replaceAt(displayWordCopy, grid.activeColumn, key), true);
          grid.gridRows[this.grid.activeRow].rowCells[grid.activeColumn].setDisplayedLetter(key);
          grid.incrementActiveColumn();
        }
      }
    }
    // Refresh word to display on active row
    //grid.gridRows[this.grid.activeRow].setDisplayWord(displayWordCopy);
    //grid.gridRows[this.grid.activeRow].rowCells[grid.activeColumn-1].setDisplayedLetter(key);
    //grid.gridRows[this.grid.activeRow].displayWord = displayWordCopy;

    return grid;
  }
  

  deleteLetter(grid: Grid): Grid {
    // Not removing comments here for now because I'm scared something could break at some specific situation because I am now handling only the letter that we want to change for displayWord
    let displayWordCopy = grid.gridRows[this.grid.activeRow].displayWord;

    if(grid.activeColumn > 0) {
      if(grid.lockGivenLetters == false || ( grid.giveLetter == true && !grid.giveLetterIndices.includes(grid.activeColumn-1) )) {
        //displayWordCopy = this.utilsService.replaceAt(displayWordCopy, grid.activeColumn-1, ".");
        grid.gridRows[this.grid.activeRow].setDisplayWord(this.utilsService.replaceAt(displayWordCopy, grid.activeColumn-1, "."), true);
        grid.gridRows[this.grid.activeRow].rowCells[grid.activeColumn-1].setDisplayedLetter(".");
        if(grid.activeColumn > 0) {
          grid.decrementActiveColumn();
        }
      } else {
        if(this.utilsService.findPreviousNonLockedLetter(grid.activeColumn, displayWordCopy.length, grid.giveLetterIndices) != -1) {
          grid.setActiveColumn(this.utilsService.findPreviousNonLockedLetter(grid.activeColumn, displayWordCopy.length, grid.giveLetterIndices) + 1);
          //displayWordCopy = this.utilsService.replaceAt(displayWordCopy, grid.activeColumn-1, ".");
          grid.gridRows[this.grid.activeRow].setDisplayWord(this.utilsService.replaceAt(displayWordCopy, grid.activeColumn-1, "."), true);
          grid.gridRows[this.grid.activeRow].rowCells[grid.activeColumn-1].setDisplayedLetter(".");
          if(grid.activeColumn > 0) {
            grid.decrementActiveColumn();
          }
        }
      }
    }
    //grid.gridRows[this.grid.activeRow].setDisplayWord(displayWordCopy);

    return grid;
  }



  makeAGuess(grid: Grid): Grid {
    let displayWordCopy = grid.gridRows[this.grid.activeRow].displayWord;

    if(displayWordCopy.includes(".")) {
      grid.showInvalidWordMessage("Le mot est incomplet !");
      // Hide the message after the animation
      setTimeout(() => {
        grid.hideInvalidWordMessage();
      }, 2000); // match the fade-out duration
    } else {
      if(displayWordCopy == this.grid.wordToGuess) {
        grid = this.goodGuess(grid);
      } else {
        if(this.utilsService.wordIsInDb(displayWordCopy)) {
          grid = this.wrongGuess(grid);
        } else {
          grid.showInvalidWordMessage("Ce mot n'est pas dans la liste !");
          // Hide the message after the animation
          setTimeout(() => {
            grid.hideInvalidWordMessage();
          }, 2000); // match the fade-out duration
        }
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
          // Set cell of the letter to correct (for the css), if letter not already correct (for a given letter for example)
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
          if(!grid.notPresentLetters.includes(letter)) {
            grid.notPresentLetters.push(letter);
          }
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
      this.utilsService.saveGame(grid.wordToGuess, grid.gridRows, false);
    } else {
      grid = this.lostGame(grid);
    }
    return grid;
  }

  wonGame(grid: Grid): Grid {
    grid.won = true;
    grid.listenKeyboard = false;
    // Open Here You Won Modal
    this.dialog.open(WonModalComponent, {
      width: '1000px',
      data: { wordToGuess: this.grid.wordToGuess },
    });
    //alert("Félicitations ! Vous avez trouvé le mot du jour !\n\nRevenez demain pour le prochain mot !");
    this.utilsService.saveGame(grid.wordToGuess, grid.gridRows, true, true);
    return grid;
  }

  lostGame(grid: Grid): Grid {
    grid.lost = true;
    grid.listenKeyboard = false;
    // Open Here You Lost Modal
    this.dialog.open(LostModalComponent, {
      width: '1000px',
      data: { wordToGuess: this.grid.wordToGuess },
    });
    //alert("Vous avez perdu ! Le mot était : " +grid.wordToGuess +".\n\nBien essayé, retentez demain !");
    this.utilsService.saveGame(grid.wordToGuess, grid.gridRows, true, false);
    return grid;
  }
  
}