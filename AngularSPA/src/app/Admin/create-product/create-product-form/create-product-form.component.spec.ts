import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductFormComponent } from './create-product-form.component';

describe('CreateProductFormComponent', () => {
  let component: CreateProductFormComponent;
  let fixture: ComponentFixture<CreateProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
