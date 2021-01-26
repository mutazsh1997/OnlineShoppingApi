import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCoustmerComponent } from './order-coustmer.component';

describe('OrderCoustmerComponent', () => {
  let component: OrderCoustmerComponent;
  let fixture: ComponentFixture<OrderCoustmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCoustmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCoustmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
