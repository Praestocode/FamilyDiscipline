import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercardpathComponent } from './usercardpath.component';

describe('UsercardpathComponent', () => {
  let component: UsercardpathComponent;
  let fixture: ComponentFixture<UsercardpathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsercardpathComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsercardpathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
