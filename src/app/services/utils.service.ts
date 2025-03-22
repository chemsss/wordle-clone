import { Injectable } from '@angular/core';

import { wordsDb } from '../../../db/db';

const acceptedLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  
  constructor() {
    
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
    const day = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    console.log(day);
    
    // Convert the date string to a hash value
    // FNV-1a hash for better randomness
    let hash = 2166136261; // FNV offset basis
    for (let i = 0; i < day.length; i++) {
        hash ^= day.charCodeAt(i);
        hash *= 16777619; // FNV prime
    }

    const startTime = performance.now()
    // Use the hash to get an index consistent with the date
    // Use an improved index computation to break consecutive day similarity
    const index = Math.floor(((hash >>> 0) / 2**32) * wordsDb.length);
    const endTime = performance.now()
    // testing performance
    console.log(`Call to compute index took ${endTime - startTime} milliseconds`)

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
  
  
}