import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpointshistoryComponent } from './userpointshistory.component';

describe('UserpointshistoryComponent', () => {
  let component: UserpointshistoryComponent;
  let fixture: ComponentFixture<UserpointshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserpointshistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserpointshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
