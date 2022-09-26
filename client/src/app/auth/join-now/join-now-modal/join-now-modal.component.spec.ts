import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinNowModalComponent } from './join-now-modal.component';

describe('JoinNowModalComponent', () => {
  let component: JoinNowModalComponent;
  let fixture: ComponentFixture<JoinNowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinNowModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinNowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
