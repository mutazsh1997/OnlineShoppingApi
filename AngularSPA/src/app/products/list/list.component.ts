import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductFormComponent, UpdateProductFormDialog } from 'src/app/Admin/create-product/create-product-form/create-product-form.component';
import { Product } from 'src/app/models/product';
import { ProductsResolver } from 'src/app/resolvers/products.resolver';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'Products-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ProductsResolver]
})
export class ProductsListComponent implements OnInit {

  products: Product[];
  spinner: boolean = true;
  smallPadding: boolean = false;
  queryParams: string;
  adminPanel: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog) { }

  ngOnInit() {
    if (this.activatedRoute.queryParams) {
      this.activatedRoute.queryParams.subscribe(er => {
        this.queryParams = er.queryValue;
        
      });
    }

    this.activatedRoute.data.subscribe(data => {
      if (data.products != undefined) {
        console.log(data);
        this.products = data.products;
        this.spinner = false
      }
      if (this.products == null) {
        this.productService.getProductsList().subscribe(res => {
          this.products = res;
          this.spinner = false
        })
      }
    })



    if (this.router.url == '/' || this.router.url == '/controlPanel/productsEditor') {
      this.smallPadding = false
    } else {
      this.smallPadding = true;
    }
    if (this.router.url == '/controlPanel/productsEditor') {
      this.adminPanel = true
    }
  }
  EditProduct(product) {
    this.dialog.open(UpdateProductFormDialog, {
      data: {
        product
      },
      autoFocus: true,
      height: 'auto',
      maxWidth: window.innerWidth < 750 ? '100%' : 'auto'
    }).afterClosed().subscribe({
      complete: () => {
        this.productService.getProductsListForAdmin().subscribe(res => {
          this.products = res;
        });
      }
    })
  }

  aprovedProduct(product) {
    if (product.isDone == true) {
      this.productService.unApprovedProduct(product.id).subscribe({
        complete: () => {
          this.productService.getProductsListForAdmin().subscribe(res => {
            this.products = res;
          });
        }
      });
    } else if (product.isDone == false) {
      this.productService.ApprovedProduct(product.id).subscribe({
        complete: () => {
          this.productService.getProductsListForAdmin().subscribe(res => {
            this.products = res;
          });
        }
      });
    }
  }
  deleteProuct(product) {
    if (confirm("are you sure you want to delete " + product.name)) {
      this.spinner = true;
      return this.productService.deleteProduct(product.id).subscribe({
        complete: () => {
          this.productService.getProductsListForAdmin().subscribe(res => {
            this.spinner = false;
            this.products = res;
          });
        }
      });

    }
  }
}
