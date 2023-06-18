import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../../../../types/product.type";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {
  private subscriptionProducts: Subscription | null = null;

  public products: ProductType[] = [];
  constructor(private productService: ProductService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.subscriptionProducts = this.productService.getProducts()
      .subscribe( {
        next: (data) => {
          this.products = data;
        },
          error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      })
  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe()
  }
}
