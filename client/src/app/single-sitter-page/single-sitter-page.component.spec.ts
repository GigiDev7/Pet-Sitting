import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSitterPageComponent } from './single-sitter-page.component';

describe('SingleSitterPageComponent', () => {
  let component: SingleSitterPageComponent;
  let fixture: ComponentFixture<SingleSitterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSitterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSitterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
