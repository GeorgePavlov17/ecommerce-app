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
  private apiUrl = 'http://localhost:5000/products';

  getProducts(): Promise<Product[]> {
   
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl).subscribe((result: any) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }
}
