import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonusersComponent } from './comparisonusers.component';

describe('ComparisonusersComponent', () => {
  let component: ComparisonusersComponent;
  let fixture: ComponentFixture<ComparisonusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComparisonusersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComparisonusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
