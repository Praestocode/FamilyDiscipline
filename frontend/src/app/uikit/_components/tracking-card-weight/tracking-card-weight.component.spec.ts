import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingCardWeightComponent } from './tracking-card-weight.component';

describe('TrackingCardWeightComponent', () => {
  let component: TrackingCardWeightComponent;
  let fixture: ComponentFixture<TrackingCardWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackingCardWeightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackingCardWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
