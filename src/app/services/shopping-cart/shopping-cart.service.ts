import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/types/Product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:5000/cart_products';

  getProducts(): Promise<Product[]> {
   
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl).subscribe((result: any) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  addToBasket(prod: Product): Promise<Product> {
    const apiUrl = 'http://localhost:5000/cart_products';

    return new Promise((resolve, reject) => {
      this.http.post<Product>(apiUrl, prod).subscribe((result: any) =>{
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  deleteProduct(prod: Product): Promise<Product> {
    const url = `${this.apiUrl}/${prod.id}`;

    return new Promise((resolve, reject) => {
      this.http.delete<Product>(url).subscribe((result: any) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }
}
