import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonlogoutComponent } from './buttonlogout.component';

describe('ButtonlogoutComponent', () => {
  let component: ButtonlogoutComponent;
  let fixture: ComponentFixture<ButtonlogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonlogoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonlogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
