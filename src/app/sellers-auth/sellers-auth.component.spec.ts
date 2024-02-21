import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersAuthComponent } from './sellers-auth.component';

describe('SellersAuthComponent', () => {
  let component: SellersAuthComponent;
  let fixture: ComponentFixture<SellersAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellersAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellersAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
