import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosecuritycardComponent } from './infosecuritycard.component';

describe('InfosecuritycardComponent', () => {
  let component: InfosecuritycardComponent;
  let fixture: ComponentFixture<InfosecuritycardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfosecuritycardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfosecuritycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
