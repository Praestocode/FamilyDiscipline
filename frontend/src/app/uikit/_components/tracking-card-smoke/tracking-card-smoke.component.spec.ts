import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingCardSmokeComponent } from './tracking-card-smoke.component';

describe('TrackingCardSmokeComponent', () => {
  let component: TrackingCardSmokeComponent;
  let fixture: ComponentFixture<TrackingCardSmokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackingCardSmokeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackingCardSmokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
