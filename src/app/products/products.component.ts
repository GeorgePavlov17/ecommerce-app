import { Component, OnInit } from '@angular/core';
import { Product } from '../types/Product';
import { ProductService } from '../services/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public productsToShow: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().then((result) => {
      // console.log(result);
      result.forEach((element: Product) => {
        this.products.push(element);
      });
      
    }, (error) =>{
      console.log('error!');
    });
    this.productsToShow = this.products;
  }

  searchProducts() {
    this.productService.getProducts().then((result) => {
      console.log(result);
      result.forEach((element: Product) => {
        this.products.push(element);
      });
      
    }, (error) =>{
      console.log('error!');
    });
    this.productsToShow = this.products;
  }

}
