import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormType} from "../../../types/form.type";
import {OrderResponseType} from "../../../types/order-response.type";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(data: FormType){
      return this.http.post<OrderResponseType>('https://testologia.site/order-tea', data);
  }
}
