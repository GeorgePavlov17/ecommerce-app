import { Component, OnInit } from '@angular/core';
import { Product } from '../types/Product';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public productsToShow: Product[] = [];

  constructor(
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().then((result) => {
      result.forEach((element: Product) => {
        this.products.push(element);
      });

    }, (error) => {
      console.log('error!');
    });
    this.productsToShow = this.products;
  }

  searchProducts(query: string): any {
    const searchedProduct: string = query;

    if (searchedProduct != '' && searchedProduct.length >= 3) {
      this.productsToShow = [];

      const filtered = this.products.filter(e => {
        return e.type.toLocaleLowerCase().indexOf(searchedProduct) > -1;
      });

      this.productsToShow = filtered;
    } else {
      this.productsToShow = this.products;
    }
  }

  addToFavourite() {

  }
}
