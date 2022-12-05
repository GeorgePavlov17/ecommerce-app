import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/types/Product';
import { resolve } from 'dns';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Promise<Product[]> {
    const apiUrl = 'http://localhost:5000/products';
   
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl).subscribe((result: any) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  addToFavourite(prod: Product): Promise<Product> {
    const apiUrl = 'http://localhost:5000/favourite_products';
    const url = `${apiUrl}/${prod.id}`;

    return new Promise((resolve, reject) => {
      this.http.post<Product>(url, prod).subscribe((result: any) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }
}
