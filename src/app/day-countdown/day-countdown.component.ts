import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { DayCountdown } from '../models/day-countdown';

import { DayCountdownService } from '../services/day-countdown.service';

@Component({
  selector: 'app-day-countdown',
  imports: [],
  templateUrl: './day-countdown.component.html',
  styleUrl: './day-countdown.component.scss'
})
export class DayCountdownComponent {

  dayCountdown!: DayCountdown;

  intervalId?: any;
  
  constructor(@Inject(PLATFORM_ID) private platformId: any, private dayCountdownService: DayCountdownService) { 
    this.dayCountdown = this.dayCountdownService.dayCountdown;
  };

  ngOnInit() {
    this.refreshCountdown(); 
    const now = new Date();
    const nextSecond = 1000 - now.getMilliseconds();
    setTimeout(() => {
      this.refreshCountdown();
      if (isPlatformBrowser(this.platformId)) {
        this.intervalId = setInterval(() => this.refreshCountdown() , 1000);
      }
    }, nextSecond);
    
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  refreshCountdown(): void{
    if(this.dayCountdown.hours == "00" && this.dayCountdown.minutes == "00" && this.dayCountdown.seconds == "00") {
      clearInterval(this.intervalId);
    } else {
      this.dayCountdown = this.dayCountdownService.refreshCountdown();
    }
  }

}
