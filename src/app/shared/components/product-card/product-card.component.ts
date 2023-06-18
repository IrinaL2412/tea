import {Component, Input} from '@angular/core';
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: ProductType;
  @Input() i: number;

  constructor() {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    }

    this.i = 0;
  }
}
