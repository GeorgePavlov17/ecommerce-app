import { Component, OnInit } from '@angular/core';
import { Product } from '../types/Product';
import { ProductService } from '../services/product/product.service';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public productsToShow: Product[] = [];
  public favouriteProducts: number[] = [];

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) { }

  ngOnInit(): void {
    this.productService.getProducts().then((result) => {
      result.forEach((element: Product) => {
        this.products.push(element);
      });

    }, (error) => {
      console.log('error!');
    });

    this.productService.getFavourites().then((result) => {
      this.favouriteProducts = result.map((prod: Product) => {
        return prod.id;
      });
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

  addToFavourite(prod: Product) {
    this.productService.addToFavourite(prod).then((result) => {
      this.favouriteProducts.push(result.id);
    }, (error) => {
      console.log('error!');
    });
  }

  removeFromFavourite(prod: Product) {
    this.productService.removeFromFavourite(prod).then((result) => {
      const index = this.favouriteProducts.indexOf(prod.id);
      const spliced = this.favouriteProducts.splice(index, 1);
    });
  }

  addToBasket(prod: Product) {
    this.shoppingCartService.addToBasket(prod).then((result) => {
      //add toastController here 
    }, (error) => {
      console.log('error!');
    });
  }
}
