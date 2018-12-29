import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigProvider } from '../config/config';

// Set timeout for response
import 'rxjs/add/operator/timeout';

@Injectable()
export class WishlistProvider {


  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(public http: HttpClient) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getWishlist(customer_id) {
    
    this.formData = new FormData();
    this.formData.append('customer_id', customer_id);

    // this.URL = ConfigProvider.BASE_URL_ + 'wishlist?customer_id=' + ConfigProvider.CUSTOMER_ID;
    this.URL = ConfigProvider.BASE_URL + '?route=restapi/account/wishlist';
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    ).timeout(9000);
  }

  addWishlist(data: any): any {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + '?route=restapi/account/wishlist/add';
    // this.formData.append('customer_id', ConfigProvider.CUSTOMER_ID.toString());
    this.formData.append('customer_id', data.customer_id);
    this.formData.append('product_id', data.product_id);
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  removeWishlist(data: any): any {

    //  this.URL = ConfigProvider.BASE_URL + '?route=restapi/account/wishlist/remove&product_id=' + product_id + '&customer_id=' + this.customerProvider.customer_id;
    this.URL = ConfigProvider.BASE_URL + '?route=restapi/account/wishlist/remove&product_id=' + data.product_id + '&customer_id=' + data.user_id;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

}
