import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustSafetyPageComponent } from './trust-safety-page.component';

describe('TrustSafetyPageComponent', () => {
  let component: TrustSafetyPageComponent;
  let fixture: ComponentFixture<TrustSafetyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustSafetyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustSafetyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
