import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayCountdownComponent } from './day-countdown.component';

describe('DayCountdownComponent', () => {
  let component: DayCountdownComponent;
  let fixture: ComponentFixture<DayCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayCountdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
