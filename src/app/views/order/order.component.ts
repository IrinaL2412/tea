import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../shared/services/order.service";
// import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {OrderResponseType} from "../../../types/order-response.type";

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
  }

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  isFormDisplayNone: boolean = false;
  isModalDisplayNone: boolean = false;
  isErrorDisplayNone: boolean = false;

  checkoutForm: FormGroup = this.fb.group({
    product: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{1,11}$')]],
    country: ['', [Validators.required, Validators.minLength(3)]],
    zip: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z0-9\\s/-]+$')]],
    comment: '',
  });

  get product() {
    return this.checkoutForm.get('product');
  }
  get name() {
    return this.checkoutForm.get('name');
  }
  get last_name() {
    return this.checkoutForm.get('last_name');
  }
  get phone() {
    return this.checkoutForm.get('phone');
  }
  get country() {
    return this.checkoutForm.get('country');
  }
  get zip() {
    return this.checkoutForm.get('zip');
  }
  get address() {
    return this.checkoutForm.get('address');
  }
  // get comment() {
  //   return this.checkoutForm.get('comment');
  // }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.checkoutForm.get('product')?.setValue(params['product']) ;
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  createOrder(): void {
    this.subscriptionOrder = this.orderService.createOrder(
      // name: this.name?.value,
      // last_name: this.last_name?.value,
      // phone: this.phone?.value,
      // country: this.country?.value,
      // zip: this.zip?.value,
      // product: this.product?.value,
      // address: this.address?.value,
      // comment: this.comment?.value,

      this.checkoutForm.value
  )
      .subscribe((response: OrderResponseType) => {
        if (response.success && !response.message) {
          this.isModalDisplayNone = true;
          this.isFormDisplayNone = true;
        } else {
          this.isErrorDisplayNone = true;
        }
      });
  }

  // closeModal() {
  //   this.isModalDisplayNone = false;
  //   this.isFormDisplayNone = false;
  //   this.checkoutForm.reset();
  //   this.isErrorDisplayNone = false;
  // }
}
