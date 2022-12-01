import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/types/Product';

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
}
