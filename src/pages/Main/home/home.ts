import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../../providers/language/language';
import { LoginProvider } from '../../../providers/login/login';
import { ProfilePage } from '../../Account/profile/profile';
import { LoginPage } from '../../Account/login/login';
import { AlertController, Alert } from 'ionic-angular';
import { CategoriesPage } from '../../Products/categories/categories';
import { CartPage } from '../../Orders/cart/cart';
import { ProductListPage } from '../../Products/product-list/product-list';
import { SpecialOffersPage } from '../../Products/special-offers/special-offers';
import { SettingsProvider } from '../../../providers/settings/settings';
import { CartProvider } from '../../../providers/cart/cart';
import { CategoryProvider } from '../../../providers/category/category';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  heading_title;
  customer_id;
  public language_id;
  public currency_id;
  public totalQty = 0;

  //categories
  responseData;
  catList: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public cartProvider: CartProvider,
    public settingsProvider: SettingsProvider,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
    public categoryProvider: CategoryProvider,
    public loginProvider: LoginProvider,
    public translate: TranslateService,
    public languageProvider: LanguageProvider,
    public alertCtrl: AlertController, ) {

    this.setText();
    // this.getProducts();
  }

  //when view will be enter in page
  ionViewWillEnter() {
    this.language_id = this.languageProvider.getLanguage();
    this.currency_id = this.settingsProvider.getCurrData();
    this.totalQty = 0;
    this.customer_id = this.loginProvider.customer_id;
    console.log("this.loginProvider.customer_id : " + this.loginProvider.customer_id);
    if (this.loginProvider.customer_id) {
      this.getProducts();
      this.getCategory();
    }
  }

  //setting text according to language
  setText() {
    this.translate.setDefaultLang(this.languageProvider.getLanguage());
    this.translate.use(this.languageProvider.getLanguage());

    this.translate.get('my_orders').subscribe((text: string) => {
      this.heading_title = text;
    });
  }

  //get categories of home icons
  getCategory() {
    this.loadingProvider.show();
    let param = {
      language_id: this.language_id,
      currency_id: this.currency_id,
    }

    this.categoryProvider.apiCategory(param).subscribe(
      response => {
        this.responseData = response;
        this.catList = this.responseData.categories;
        console.log("this.catList[0].title : " + this.catList[0].title);
        // console.log("catList : " + JSON.stringify(this.catList));
        this.loadingProvider.dismiss();
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
  }

  //goto cart page
  gotoCart() {
    if (this.loginProvider.customer_id) {
      this.navCtrl.push(CartPage, { from: 'home' });

    }
    else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  //goto home page
  gotoHome() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  //goto caategories page
  gotoCategory() {
    this.navCtrl.setRoot(CategoriesPage);
  }

  //goto profile page
  gotoProfile() {
    if (this.loginProvider.customer_id) {
      this.navCtrl.setRoot(ProfilePage);
    }
    else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  //goto notifications page
  gotoNotifications() {
    // if (!this.loginProvider.authenticated()) {
    //   this.navCtrl.setRoot(LoginPage);
    // }
    // else {
    //   this.navCtrl.setRoot(CategoriesPage);
    // }
  }

  //goto search page
  gotoSearch() {
    this.navCtrl.push(ProductListPage, { from: 'home' });
  }

  //goto offers page
  gotoOffers() {
    this.navCtrl.push(SpecialOffersPage);
  }

  //get cart quantity
  public getProducts() {
    let param = {
      language_id: this.language_id,
      currency_id: this.currency_id
    };
    this.cartProvider.products(param).subscribe(
      response => {
        if (response) {
          if (response.total_quantity) {
            this.totalQty = response.total_quantity;
          }
        }
      },
      err => console.error(err),
      () => {
      }
    );
    return event;

  }
}