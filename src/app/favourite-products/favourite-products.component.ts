import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product } from '../types/Product';

@Component({
  selector: 'app-favourite-products',
  templateUrl: './favourite-products.component.html',
  styleUrls: ['./favourite-products.component.scss']
})
export class FavouriteProductsComponent implements OnInit {
  public favouriteProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getFavourites().then((result) => {
      this.favouriteProducts = result;
    });
  }
  
  addToFavourite(prod: Product) {
    this.productService.addToFavourite(prod).then((result) => {
      this.favouriteProducts.push(result);
      console.log(this.favouriteProducts);
    }, (error) => {
      console.log('error!');
    });
  }

  removeFromFavourite(prod: Product) {
    this.productService.removeFromFavourite(prod).then((result) => {
      const index = this.favouriteProducts.indexOf(prod);
      const spliced = this.favouriteProducts.splice(index, 1);
    });
  }
}
