import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SittersPageComponent } from './sitters-page.component';

describe('SittersPageComponent', () => {
  let component: SittersPageComponent;
  let fixture: ComponentFixture<SittersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SittersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SittersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
