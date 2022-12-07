import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product } from '../types/Product';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-favourite-products',
  templateUrl: './favourite-products.component.html',
  styleUrls: ['./favourite-products.component.scss']
})
export class FavouriteProductsComponent implements OnInit {
  public products: Product[] = [];
  public productsToShow: Product[] = [];
  public favouriteProducts: Product[] = [];
  public loading: boolean = false;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) { }

  ngOnInit(): void {
    this.productService.getFavourites().then((result) => {
      this.favouriteProducts = result;
    });
  }

  removeFromFavourite(prod: Product) {
    this.productService.removeFromFavourite(prod).then((result) => {
      const index = this.favouriteProducts.indexOf(prod);
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

  searchProducts(query: string): any {

    if (query != '' && query.length >= 2) {
      this.loading = true;
      this.productsToShow = [];

      setTimeout(() => {
        const filtered = this.products.filter(e => {
          return e.type.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1;
        });
        this.productsToShow = filtered;
        this.loading = false;
      }, 1000);
     
    } else {
      this.productsToShow = this.products;
      this.loading = false;
    }
  }
}
