import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAuthComponent } from './confirm-auth.component';

describe('ConfirmAuthComponent', () => {
  let component: ConfirmAuthComponent;
  let fixture: ComponentFixture<ConfirmAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
