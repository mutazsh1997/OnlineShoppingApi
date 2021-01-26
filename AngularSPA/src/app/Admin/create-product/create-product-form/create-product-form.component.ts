import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRole, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Categories } from 'src/app/models/categories';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.scss', '../create-product.component.scss'],
})
export class CreateProductFormComponent implements OnInit {


  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
  ) { }


  productStates: string = "next";

  createProductForm: FormGroup;
  categories: Categories[];

  @Output() submitForm: EventEmitter<FormGroup> = new EventEmitter();

  ngOnInit(): void {

    this.createProductForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Price: new FormControl('', Validators.required),
      productDescription: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
    });

    this.categoryService.getCategories().subscribe((res: Categories[]) => {
      this.categories = res;
    })

  }
  createProduct() {
    if (this.productStates == "next") {
      this.submitForm.emit(this.createProductForm);
    }
  }
}

@Component({
  selector: 'app-update-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.scss', '../create-product.component.scss'],
})
export class UpdateProductFormDialog implements OnInit {
  createProductForm: FormGroup;
  categories: Categories[];
  productStates: string = "update";

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public product,
    private dialogRef: MatDialogRef<DialogRole>,
  ) { }

  ngOnInit() {
    this.createProductForm = new FormGroup({
      Name: new FormControl(this.product.product.name, Validators.required),
      Price: new FormControl(this.product.product.price, Validators.required),
      productDescription: new FormControl(this.product.product.productDescription, Validators.required),
      categoryId: new FormControl(this.product.product.category.id, Validators.required),
    });

    this.categoryService.getCategories().subscribe((res: Categories[]) => {
      this.categories = res;
    })
  }
  createProduct() {
    let createProductModel = Object.assign({}, this.createProductForm.value)

    this.productService.updateProduct(this.product.product.id, createProductModel).subscribe(
      {
        complete: () =>
          this.dialogRef.close()
      })
  }
}