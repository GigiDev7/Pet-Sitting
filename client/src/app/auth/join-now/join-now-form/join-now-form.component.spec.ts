import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinNowFormComponent } from './join-now-form.component';

describe('JoinNowFormComponent', () => {
  let component: JoinNowFormComponent;
  let fixture: ComponentFixture<JoinNowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinNowFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinNowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
