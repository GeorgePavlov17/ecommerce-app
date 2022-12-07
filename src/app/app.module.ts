import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from "primeng/divider";
import { FormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {Dialog, DialogModule} from "primeng/dialog";
import {ConfirmDialog, ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, Footer, Header, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {ListboxModule} from "primeng/listbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {PanelModule} from "primeng/panel";
import {AccordionModule} from "primeng/accordion";
import {CalendarModule} from "primeng/calendar";
import {TabViewModule} from "primeng/tabview";
import {FocusTrapModule} from "primeng/focustrap";
import {CheckboxModule} from "primeng/checkbox";
import {TreeTableModule} from "primeng/treetable";
import {TreeModule} from "primeng/tree";
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FavouriteProductsComponent } from './favourite-products/favourite-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductsComponent,
    HeaderComponent,
    ShoppingCartComponent,
    FavouriteProductsComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputNumberModule,
    DividerModule,
    FormsModule,
    ProgressSpinnerModule,

    SharedModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    MenubarModule,
    ButtonModule,
    ListboxModule,
    RadioButtonModule,
    PanelModule,
    AccordionModule,
    CalendarModule,
    TabViewModule,
    FocusTrapModule,
    CheckboxModule,
    TreeTableModule,
    TreeModule

  ],
  providers: [
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }