import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product } from '../types/Product';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild('searchBox') searchBox!: ElementRef;

  public products: Product[] = [];
  public productsToShow: Product[] = [];
  public searchesToShow: boolean = false;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {

  }

  toggleSearch() {
    this.searchesToShow = !this.searchesToShow;
  }

  hideResults() {
    this.searchesToShow = false;
  }

  backToHome() {
    const searchedProduct = this.searchBox.nativeElement.value;

    if (!this.searchProducts) {
      this.productsToShow = this.products;
    }
  }

  searchProducts(): any {
    const searchedProduct = this.searchBox.nativeElement.value;

    if (searchedProduct != '' && searchedProduct.length >= 3) {
      this.productsToShow = [];

      this.productService.getProducts().then((result) => {
        result.forEach((element: Product) => {
          this.products.push(element);
        });

        const filtered = this.products.filter(e => {
          return e.type.toLocaleLowerCase().indexOf(searchedProduct) > -1;
        });

        this.productsToShow = filtered;

      }, (error) => {
        console.log('error!');
      });

    } else {
      this.productsToShow = this.products;
    }
  }
}
