import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostModalComponent } from './lost-modal.component';

describe('LostModalComponent', () => {
  let component: LostModalComponent;
  let fixture: ComponentFixture<LostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
