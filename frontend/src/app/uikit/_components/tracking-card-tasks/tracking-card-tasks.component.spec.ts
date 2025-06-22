import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingCardTasksComponent } from './tracking-card-tasks.component';

describe('TrackingCardTasksComponent', () => {
  let component: TrackingCardTasksComponent;
  let fixture: ComponentFixture<TrackingCardTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackingCardTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackingCardTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
