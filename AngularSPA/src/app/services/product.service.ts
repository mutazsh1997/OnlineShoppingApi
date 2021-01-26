import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Colors } from '../models/color';
import { Product } from '../models/product';
import { Sizes } from '../models/size';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  currentProduct;
  hideNav: boolean = false;

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createProduct(product: Product) {
    return this.http.post(`${this.baseUrl}products`, product)
  }

  getProductsList() {
    return this.http.get<Product[]>(`${this.baseUrl}products`)
  }
  getProductsListForAdmin() {
    return this.http.get<Product[]>(`${this.baseUrl}products/GetProductsForAdmin`)
}

  getProduct(Id: string) {
    return this.http.get(`${this.baseUrl}products/${Id}`);
  }

  addColour(colors: Colors, productId) {
    return this.http.post(`${this.baseUrl}product/color/${productId}`, colors);
  }
  addSize(sizes: Sizes, productId) {
    return this.http.post(`${this.baseUrl}product/size/${productId}`, sizes);
  }
  ApprovedProduct(productId) {
    return this.http.post(`${this.baseUrl}products/approvedProduct/${productId}`, {});
  }
  unApprovedProduct(productId) {
    return this.http.post(`${this.baseUrl}products/unApprovedProduct/${productId}`, {});
  }
  deleteProduct(productId) {
    return this.http.delete(`${this.baseUrl}products/deleteProduct/${productId}`);

  }
  updateProduct(productId, productUpdateData) {
    return this.http.put(`${this.baseUrl}products/${productId}`, productUpdateData);
  }
}
