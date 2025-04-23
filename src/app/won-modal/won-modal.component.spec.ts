import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WonModalComponent } from './won-modal.component';

describe('WonModalComponent', () => {
  let component: WonModalComponent;
  let fixture: ComponentFixture<WonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WonModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
