import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationPopupComponent } from './authentication-popup.component';

describe('AuthenticationPopupComponent', () => {
  let component: AuthenticationPopupComponent;
  let fixture: ComponentFixture<AuthenticationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
