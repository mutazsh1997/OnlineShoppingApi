import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createCategory(categoryName: string) {
    return this.http.post(`${this.apiUrl}category`, categoryName);
  }
  getCategories() {
    return this.http.get(`${this.apiUrl}category`);
  }
  getProductsByCategory(categoryName: string) {
    return this.http.get(`${this.apiUrl}products/category/${categoryName}`);
  }
  QueryProducts(queryValue) {
    return this.http.get(`${this.apiUrl}products/productsSearch/${queryValue}`)
  }
  editCategoryName(categoryId: number, newName: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    var name = JSON.stringify(newName);

    return this.http.patch(`${this.apiUrl}category/newname/${categoryId}`, name, options);
  }
}
