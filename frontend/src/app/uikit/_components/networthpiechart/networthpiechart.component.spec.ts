import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworthpiechartComponent } from './networthpiechart.component';

describe('NetworthpiechartComponent', () => {
  let component: NetworthpiechartComponent;
  let fixture: ComponentFixture<NetworthpiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworthpiechartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetworthpiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
