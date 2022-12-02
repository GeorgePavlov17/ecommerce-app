import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchBox') searchBox!: ElementRef;
  @Output() onSearch = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    const query = this.searchBox.nativeElement.value;
    this.onSearch.emit(query);
  }

}
