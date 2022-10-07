import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSitterPageComponent } from './find-sitter-page.component';

describe('FindSitterPageComponent', () => {
  let component: FindSitterPageComponent;
  let fixture: ComponentFixture<FindSitterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindSitterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSitterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
