import { Injectable } from '@angular/core';

import { DayCountdown } from '../models/day-countdown';

@Injectable({
  providedIn: 'root'
})

export class DayCountdownService {
  
  dayCountdown!: DayCountdown;



  constructor() {
    let today = new Date();
    let hours = (23 - today.getHours()).toString().padStart(2, '0');
    let minutes = (59 - today.getMinutes()).toString().padStart(2, '0');
    let seconds = (59 - today.getSeconds()).toString().padStart(2, '0');

    console.log(hours, minutes, seconds);
    this.dayCountdown = new DayCountdown(hours, minutes, seconds);
  }

  refreshCountdown(): DayCountdown {
    const startTime = performance.now()
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0);  //next day midnight

    const diff = midnight.getTime() - now.getTime();
    const totalSeconds = Math.ceil(diff / 1000);
    
    this.dayCountdown.hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    this.dayCountdown.minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    this.dayCountdown.seconds = (totalSeconds % 60).toString().padStart(2, '0');
    
    const endTime = performance.now()
    //console.log(`refreshCountdown took ${endTime - startTime} milliseconds`)
    return this.dayCountdown;
  }
  
  
}