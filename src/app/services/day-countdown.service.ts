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

    this.dayCountdown = new DayCountdown(hours, minutes, seconds);
  }

  refreshCountdown(): DayCountdown {
    // TODO : add in session storage day on which user connected, and check if day is different (when user connects at 11:55PM and is still here at 00:05AM, countdown should stay at 00:00 and not reset till user refreshes the page)
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0);  //next day midnight

    const diff = midnight.getTime() - now.getTime();
    const totalSeconds = Math.ceil(diff / 1000);
    
    this.dayCountdown.hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    this.dayCountdown.minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    this.dayCountdown.seconds = (totalSeconds % 60).toString().padStart(2, '0');
    
    return this.dayCountdown;
  }
  
  
}