import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetBoxComponent } from './pet-box.component';

describe('PetBoxComponent', () => {
  let component: PetBoxComponent;
  let fixture: ComponentFixture<PetBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
