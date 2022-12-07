import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { Product } from '../types/Product';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchBox') searchBox!: ElementRef;
  @Input() hasSearch: boolean = true;
  @Output() onSearch = new EventEmitter<string>();

  public products: Product[] = [];
  public productsToShow: Product[] = [];
  // public searchShown: boolean = false;

  constructor(private productService: ProductService) { }

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

  search() {
    const name = this.searchBox.nativeElement.value;
    this.onSearch.emit(name);

  }

  showCategories() {
   
  }

}
