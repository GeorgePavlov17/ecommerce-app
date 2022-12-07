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

  public quantityOptions: Product[] = [];
  public selectedQty: any;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.shoppingCartService.getProducts().then((result) => {
      result.forEach((element: Product) => {
        this.products.push(element);
      });

    }, (error) => {
      console.log('error!');
    });
    this.productsToShow = this.products;
  }

  totalCartPrice() {
    let total = 0;

    this.productsToShow.forEach((product: any) => {

      if (product.availability === true) {
        total += Number(product.price);
      } else {
        total -= product.availability;
      }
    });
    return total;
  }

  totalProductPrice(prodPrice: number, vat: number) {
    return Number(prodPrice) + Number(vat);
  }

  totalWithVatPrice() {
    return this.totalCartPrice() + this.totalVat();
  }

  // quantityTotalPriceDropdown(qty: number, price: number) {
  //   let total = 0;

  // }

  // dropdownTotalQtyShow() {
  //   console.log('totalQty');
  // }

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
