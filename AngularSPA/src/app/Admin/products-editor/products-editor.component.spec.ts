import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsEditorComponent } from './products-editor.component';

describe('ProductsEditorComponent', () => {
  let component: ProductsEditorComponent;
  let fixture: ComponentFixture<ProductsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
