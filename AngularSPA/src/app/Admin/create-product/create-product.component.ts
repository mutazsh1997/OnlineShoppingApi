import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Colors } from 'src/app/models/color';
import { Product } from 'src/app/models/product';
import { Sizes } from 'src/app/models/size';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  createProductModel: Product;

  propProductForm: FormGroup;

  @Output() productId: string;

  finalProduct: Product;
  createPorductPorgress: number = 1;

  colorVAL = '#000000';

  @ViewChild('creatingProgress', { static: false }) creatingProgress: ElementRef;

  constructor(private productService: ProductService
  ) { }


  ngOnInit() {

    this.propProductForm = new FormGroup({
      ProductColors: new FormArray([
        new FormControl(this.colorVAL, Validators.required)
      ]),
      ProductSizes: new FormArray([
        new FormControl('', Validators.required)
      ]),
    });

  }


  get ProductColors(): FormArray {
    return this.propProductForm.get('ProductColors') as FormArray;
  }
  imageToPass(img) {
    this.finalProduct.photoUrl = img.src;
  }

  addColor() {
    this.ProductColors.push(new FormControl(''));
  }

  deleteNameFieldColor(index: number) {
    this.ProductColors.removeAt(index);
  }

  changeCreatingPorgress() {
    if (this.createPorductPorgress < 4) {
      this.createPorductPorgress++;
    }
  }
  get ProductSizes(): FormArray {
    return this.propProductForm.get('ProductSizes') as FormArray;
  }

  addSize() {
    this.ProductSizes.push(new FormControl(''));
  }
  deleteNameFieldSize(index: number) {

    this.ProductSizes.removeAt(index);

  }


  createProduct(createProductForm: FormGroup) {

    if (createProductForm.valid) {
      this.createProductModel = Object.assign({}, createProductForm.value)

      this.productService.createProduct(this.createProductModel).subscribe((res: Product) => {

        this.finalProduct = res;

        this.productId = res.id;
      }, err => {
        console.log(err);
      }, () => {
        this.changeCreatingPorgress();
      })
    }
  }

  propProduct() {
    if (this.propProductForm.valid) {
      const Colors: Colors[] = this.ProductColors.value;
      const Sizes: Sizes[] = this.ProductSizes.value;

      Sizes.forEach(sl => {
        this.productService.addSize(Object.assign({ "size": sl }), this.productId).subscribe(res => {
          this.finalProduct.sizes.push(res as Sizes);

        }, err => console.log(err));

      })
      Colors.forEach(cl => {
        this.productService.addColour(Object.assign({ "color": cl }), this.productId).subscribe(res => {
          this.finalProduct.colors.push(res as Colors);

        }, err => console.log(err),
        );
      })
      this.changeCreatingPorgress();
    }
  }
  ApprovedProduct() {
    console.log(this.finalProduct);
    this.productService.ApprovedProduct(this.productId).subscribe(
      { complete: () => this.createPorductPorgress = 1 }
    );
  }

}
