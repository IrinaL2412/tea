import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {ProductCardDescriptionPipe} from "./pipes/product-card-description.pipe";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    ProductCardDescriptionPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    ProductCardDescriptionPipe
  ]
})
export class SharedModule { }
