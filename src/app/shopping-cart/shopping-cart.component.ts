import { Component, OnInit } from '@angular/core';
import { Product } from '../types/Product';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public products: Product[] = [];
  public productsToShow: Product[] = [];

  public quantityProducts: number[] = [];
  public selectedQty: { [g: number]: number } = {};

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.shoppingCartService.getProducts().then((result) => {
      result.forEach((element: Product) => {
        this.products.push(element);
        this.selectedQty[element.id] = 1;
      });

    }, (error) => {
      console.log('error!');
    });
    this.productsToShow = this.products;
  }

  getProductQtyAsArray(quantity: number) {
    const arr = [];
    for (let i = 1; i <= quantity; i++) {
      arr.push(i);
    }
    return arr;
  }

  totalCartPrice() {
    let total = 0;

    this.productsToShow.forEach((product: any) => {

      if (product.availability === true) {
        total += Number(product.price) * this.selectedQty[product.id];
      } else {
        total -= product.availability;
      }
    });
    return total;
  }

  totalProductPrice(prod: Product): number {

    if (this.selectedQty[prod.id]) {
      const prodPrice = Number(prod.price);
      const singleProd = Number(this.selectedQty[prod.id]);

      return prodPrice * singleProd;
      
    } else {
      return prod.price;
    }
  }

  totalWithVatPrice() {
    return this.totalCartPrice() + this.totalVat();
  }

  deliveryDate() {
    const d = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    return d.toDateString();
  }

  totalVat() {
    let numOfProd = 0;

    for (let i = 0; i < this.productsToShow.length; i++) {
      numOfProd++;
    }

    this.productsToShow.forEach((product: any) => {
      if (product.availability === false) {
        numOfProd--;
      }
    });
    return Number(numOfProd * 8);
  }

  deleteProduct(prod: Product) {
    this.shoppingCartService.deleteProduct(prod).then((result) => {
      const index = this.productsToShow.indexOf(result);
      const spliced = this.productsToShow.splice(index, 1);
    });
  }
}
