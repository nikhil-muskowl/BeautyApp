import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigProvider } from '../config/config';
// Set timeout for response
import 'rxjs/add/operator/timeout';


@Injectable()
export class CartProvider {

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(
    public http: HttpClient, ) {

    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  products(data: any): any {
    // this.URL = ConfigProvider.BASE_URL + 'cart?customer_id=' + data.user_id + '&postcode=' + data.postcode;
    this.URL = ConfigProvider.BASE_URL + '?route=restapi/checkout/cart';
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    ).timeout(9000);
  }

  add(data: any): any {
    this.formData = new FormData();
    console.log(data);
    this.URL = ConfigProvider.BASE_URL + '?route=restapi/checkout/cart/add';
    this.formData.append('customer_id', data.user_id);
    this.formData.append('product_id', data.product_id);
    // this.formData.append('detail_id', data.detail_id);
    this.formData.append('quantity', data.quantity);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  edit(data: any): any {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + '?route=restapi/checkout/cart/edit';
    this.formData.append('key', data.cart_id);
    this.formData.append('quantity', data.quantity);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  remove(data: any): any {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + '?route=restapi/checkout/cart/remove';
    this.formData.append('key', data.cart_id);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getTermCondition() {
    this.URL = ConfigProvider.BASE_URL + 'termandcondition';
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }
}
