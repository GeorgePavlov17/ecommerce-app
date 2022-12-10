import { Component, ElementRef, Inject, Renderer2, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product } from '../types/Product';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild('searchBox') searchBox!: ElementRef;
  theme: Theme = 'light-theme';

  public products: Product[] = [];
  public productsToShow: Product[] = [];
  // public searchesToShow: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.initializeTheme();
  }

  // toggleSearch() {
  //   this.searchesToShow = !this.searchesToShow;
  // }

  // hideResults() {
  //   this.searchesToShow = false;
  // }

  // backToHome() {
  //   const searchedProduct = this.searchBox.nativeElement.value;

  //   if (!this.searchProducts) {
  //     this.productsToShow = this.products;
  //   }
  // }

  initializeTheme = (): void =>
    this.renderer.addClass(this.document.body, this.theme);

  changeTheme() {
    this.document.body.classList.replace(
      this.theme, 
      this.theme === 'light-theme' 
      ? (this.theme = 'dark-theme')
      : (this.theme = 'light-theme')
    );
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

export type Theme = 'light-theme' | 'dark-theme';
