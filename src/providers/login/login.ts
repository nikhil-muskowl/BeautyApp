import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App } from "ionic-angular";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

import { Platform } from 'ionic-angular';
import { ConfigProvider } from '../config/config';

@Injectable()
export class LoginProvider {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;
  private agree = 1;
  public customer_id;

  constructor(public http: HttpClient,
    public platform: Platform,
    public app: App) {

    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');

    this.customer_id = Number(this.getData());
  }

  //api to register user
  apiRegister(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + '?route=restapi/register';

    this.formData.append('firstname', data.firstname);
    this.formData.append('lastname', data.lastname);
    this.formData.append('email', data.email);
    this.formData.append('telephone', data.telephone);
    this.formData.append('password', data.password);
    this.formData.append('confirm', data.confirm);
    this.formData.append('agree', this.agree.toString());

    return this.http.post<any>(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  //api to login user
  apiLogin(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + '?route=restapi/login';

    this.formData.append('email', data.email);
    this.formData.append('password', data.password);

    return this.http.post<any>(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  //api to get user profile
  apiProfile() {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + '?route=restapi/account/profile';

    this.formData.append('customer_id', this.customer_id);

    return this.http.post<any>(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  //api to update user profile
  apiProfileUpdate(data: any) {

    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + '?route=restapi/account/edit';

    this.formData.append('firstname', data.firstname);
    this.formData.append('lastname', data.lastname);
    this.formData.append('email', data.email);
    this.formData.append('telephone', data.telephone);
    this.formData.append('customer_id', this.customer_id);

    return this.http.post<any>(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  //set user id in storage
  setData(data) {
    this.customer_id = data.customer_id;
    window.localStorage.setItem('beauty_login', data.customer_id);
  }

  //clear storage
  unSetData() {
    try {
      this.customer_id = undefined;
      return window.localStorage.removeItem('beauty_login');
    } catch (error) {
      return 0;
    }
  }

  //get user id from storage
  getData() {
    try {
      return window.localStorage.getItem('beauty_login');
    } catch (error) {
      return 0;
    }

  }

  //api to change pasword
  changePassword(data: any) {
    this.formData = new FormData();

    this.URL = ConfigProvider.BASE_URL + '?route=restapi/account/password';

    this.formData.append('customer_id', this.customer_id);
    this.formData.append('password', data.password);
    this.formData.append('confirm', data.confirm);

    return this.http.post<any>(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  //api to forgot passeord
  forgotPassword(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + '?route=restapi/account/forgotten';

    this.formData.append('email', data.email);
    return this.http.post<any>(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  //logout user
  logout() {
    this.unSetData();
    window.localStorage.clear();
  }
}
