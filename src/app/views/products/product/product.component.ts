import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  public product: ProductType;
  public i: number;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    }
    this.i = 0;
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productService.getProduct(params['id'])
          .subscribe({
            next: (data) => {
              this.product = data;
              this.i = this.product.id;
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/']);
            }
          });
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
