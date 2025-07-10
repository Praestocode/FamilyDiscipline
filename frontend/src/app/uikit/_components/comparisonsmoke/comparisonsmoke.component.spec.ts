import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonsmokeComponent } from './comparisonsmoke.component';

describe('ComparisonsmokeComponent', () => {
  let component: ComparisonsmokeComponent;
  let fixture: ComponentFixture<ComparisonsmokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComparisonsmokeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComparisonsmokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
