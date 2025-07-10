import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisontasksComponent } from './comparisontasks.component';

describe('ComparisontasksComponent', () => {
  let component: ComparisontasksComponent;
  let fixture: ComponentFixture<ComparisontasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComparisontasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComparisontasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
