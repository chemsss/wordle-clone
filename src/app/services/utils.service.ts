import {isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { wordsDb } from '../../../db/db';
import { Grid } from '../models/grid';
import { GridRow } from '../models/grid-row';

const acceptedLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  private platformId!: Object;
  
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.platformId = platformId;
  }


  getWordOfTheDay(): string {
    let wordToGuess = this.getAWordDependingOnDay(new Date());
    
    // Remove french accents from word and make it uppercase
    wordToGuess = wordToGuess.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

    return wordToGuess;
  }

  /* notes mots par jour
  20/03 : minuties
  19/03 : munificences
  21/03 : moignon
  */


  getAWordDependingOnDay(date: Date): string {
    // Get today's date as YYYY-MM-DD string
    let day = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    let testDate = new Date();
    if(testDate.getMinutes() > 10) {
      day = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()+9).padStart(2, '0')}`;
    }
    console.log(day);
    
    // Convert the date string to a hash value
    // FNV-1a hash for better randomness
    let hash = 2166136261; // FNV offset basis
    for (let i = 0; i < day.length; i++) {
        hash ^= day.charCodeAt(i);
        hash *= 16777619; // FNV prime
    }

    //const startTime = performance.now()
    // Use the hash to get an index consistent with the date
    // Use an improved index computation to break consecutive day similarity
    const index = Math.floor(((hash >>> 0) / 2**32) * wordsDb.length);
    //const endTime = performance.now()
    // testing performance
    //console.log(`Call to compute index took ${endTime - startTime} milliseconds`)

    if(index >= wordsDb.length || index < 0) {
      console.log("INDEX PROBLEM");
      return wordsDb[0].word
    } else {
      return wordsDb[index].word;
    }
  }


  getApostrophesAndHyphensIndices(word: string): number[] {
    let indices = [];
    for(let i=0; i < word.length; i++) {
      if(word.charAt(i) == "'" || word.charAt(i) == "-") {
        indices.push(i);
      }
    }
    return indices;
  }

  replaceAt(string: string, index: number, replacement: string): string {
    if(index >= 0) {
      if(index == 0) {
        return replacement + string.substring(index + replacement.length);
      } else {
        return string.substring(0, index) + replacement + string.substring(index + replacement.length);
      }
    } else {
      return string;
    }
    
  }

  findNextNonLockedLetter(activeColumn: number, wordLength: number, lockedLetters: number[]): number {
    let indices = [];
    for(let i=activeColumn; i < wordLength; i++) {
      if(!lockedLetters.includes(i)) {
        indices.push(i);
      }
    }
    if(indices.length == 0) {
      return -1
    } else {
      return Math.min(...indices);
    }
  }

  findPreviousNonLockedLetter(activeColumn: number, wordLength: number, lockedLetters: number[]): number {
    let indices = [];
    for(let i=0; i < activeColumn; i++) {
      if(!lockedLetters.includes(i)) {
        indices.push(i);
      }
    }
    if(indices.length == 0) {
      return -1
    } else {
      return Math.max(...indices);
    }
  }


  // Only called when game is finished (user found the word (won) or max number of tries reached (lost))
  saveGame(wordToGuess: string, rows: GridRow[], won: boolean): void {
    let date = new Date();
    const day = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    let save = {
      won: won,
      rows: [ [ { } ] ],
      word: wordToGuess
    }
    for(let i=0 ; i < rows.length ; i++) {
      let cells = [];
      for(let j=0 ; j < rows[i].rowCells.length ; j++) {
        cells.push({
          letter: rows[i].rowCells[j].displayedLetter,
          status: rows[i].rowCells[j].status
        });
      }
      save.rows.push(cells);
    }
    save.rows.shift();
    let userHistory = JSON.parse(localStorage.getItem('userHistory') || '{}');
    userHistory[day] = save;
    localStorage.setItem("userHistory", JSON.stringify(userHistory));
  }


  checkIfGameSaved(date: Date): boolean {
    const day = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    if (isPlatformBrowser(this.platformId)) {
      let userHistory = JSON.parse(localStorage.getItem('userHistory') || '{}');
      if(userHistory[day]) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  loadTodaysGame(grid: Grid): Grid {
    let date = new Date();
    const day = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    let userHistory = JSON.parse(localStorage.getItem('userHistory') || '{}');
    userHistory = userHistory[day];
    for(let i=0 ; i < userHistory.rows.length ; i++) {
      if(grid.gridRows[i]) {
        let rowWord = "";
        for(let j=0 ; j < userHistory.rows[i].length ; j++) {
          grid.gridRows[i].setCellStatus(j, userHistory.rows[i][j].status);
          rowWord += userHistory.rows[i][j].letter;

        }
        grid.gridRows[i].setDisplayWord(rowWord);
        if(!rowWord.includes(".")) {
          grid.gridRows[i].active = true;
        }
      }
    }
    if(userHistory.won == true) {
      grid.won = true;
      grid.listenKeyboard = false;
      // Open Here You Won Modal
    } else {
      grid.lost = true;
      grid.listenKeyboard = false;
      // Open Here You Lost Modal
    }
     
    return grid;
  }
  
  
}