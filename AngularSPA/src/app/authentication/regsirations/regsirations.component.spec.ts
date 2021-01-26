import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegsirationsComponent } from './regsirations.component';

describe('RegsirationsComponent', () => {
  let component: RegsirationsComponent;
  let fixture: ComponentFixture<RegsirationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegsirationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegsirationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
