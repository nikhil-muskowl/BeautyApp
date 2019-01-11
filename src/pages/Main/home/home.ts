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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public cartProvider: CartProvider,
    public settingsProvider: SettingsProvider,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
    public loginProvider: LoginProvider,
    public translate: TranslateService,
    public languageProvider: LanguageProvider,
    public alertCtrl: AlertController, ) {

    this.language_id = this.languageProvider.getLanguage();
    this.currency_id = this.settingsProvider.getCurrData();

    this.customer_id = this.loginProvider.customer_id;
    this.setText();
    // this.getProducts();

  }

  ionViewWillEnter() {
    if (!this.loginProvider.authenticated()) {
      this.getProducts();
    }
  }

  setText() {
    this.translate.setDefaultLang(this.languageProvider.getLanguage());
    this.translate.use(this.languageProvider.getLanguage());

    this.translate.get('my_orders').subscribe((text: string) => {
      this.heading_title = text;
    });
  }

  gotoCart() {
    if (!this.loginProvider.authenticated()) {
      this.navCtrl.setRoot(LoginPage);
    }
    else {
      this.navCtrl.push(CartPage, { from: 'home' });
    }
  }

  gotoHome() {
    this.navCtrl.setRoot(HomePage);
  }

  gotoCategory() {
    this.navCtrl.setRoot(CategoriesPage);
  }

  gotoProfile() {
    if (!this.loginProvider.authenticated()) {
      this.navCtrl.setRoot(LoginPage);
    }
    else {
      this.navCtrl.setRoot(ProfilePage);
    }
  }

  gotoNotifications() {
    if (!this.loginProvider.authenticated()) {
      this.navCtrl.setRoot(LoginPage);
    }
    else {
      this.navCtrl.setRoot(CategoriesPage);
    }
  }

  gotoSearch() {
    this.navCtrl.push(ProductListPage, { from: 'home' });
  }

  gotoOffers() {
    this.navCtrl.push(SpecialOffersPage);
  }

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