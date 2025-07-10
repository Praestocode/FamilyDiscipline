import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonweightComponent } from './comparisonweight.component';

describe('ComparisonweightComponent', () => {
  let component: ComparisonweightComponent;
  let fixture: ComponentFixture<ComparisonweightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComparisonweightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComparisonweightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
