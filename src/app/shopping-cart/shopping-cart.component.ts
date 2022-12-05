import { Component, OnInit } from '@angular/core';
import { Product } from '../types/Product';
import { ProductService } from '../services/product/product.service';
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
    private productService: ProductService,
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
      total += Number(product.price) + Number(product.vat);
    });
    return total;
  }

  totalProductPrice(prodPrice: number, vat: number) {
    return Number(prodPrice) + Number(vat);
  }

  totalWithVatPrice() {
    return this.totalCartPrice() + Number(8);
  }

  quantityTotalPriceDropdown(qty: number, price: number) {
    let total = 0;

  }

  dropdownTotalQtyShow() {
    console.log('totalQty');
  }

  deleteProduct(prod: Product) {
   this.shoppingCartService.deleteProduct(prod).then((result) => {
    const index = this.productsToShow.indexOf(result);
    const spliced = this.productsToShow.splice(index, 1);
   });
  }
}
