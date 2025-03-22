export class DayCountdown {
  hours!: string;
  minutes!: string;
  seconds!: string;

  constructor(hours: string, minutes: string, seconds: string) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  setHours(hours: string): void {
    this.hours = hours;
  }

  setMinutes(minutes: string): void {
    this.minutes = minutes;
  }

  setSeconds(seconds: string): void {
    this.seconds = seconds;
  }

}