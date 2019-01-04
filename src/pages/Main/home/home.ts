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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  heading_title;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
    public loginProvider: LoginProvider,
    public translate: TranslateService,
    public languageProvider: LanguageProvider,
    public alertCtrl: AlertController, ) {

  }

  setText() {
    this.translate.setDefaultLang(this.languageProvider.getLanguage());
    this.translate.use(this.languageProvider.getLanguage());

    this.translate.get('my_orders').subscribe((text: string) => {
      this.heading_title = text;
    });
  }

  gotoCart() {
    this.navCtrl.push(CartPage);
  }

  gotoHome() {
    this.navCtrl.setRoot(HomePage);
  }

  gotoCategory() {
    this.navCtrl.setRoot(CategoriesPage);
  }

  gotoProfile() {
    this.navCtrl.setRoot(ProfilePage);
  }

  gotoNotifications() {
    this.navCtrl.setRoot(CategoriesPage);
  }

  gotoSearch() {
    this.navCtrl.push(ProductListPage, { from: 'home' });
  }

  gotoOffers() {

  }

  public getProducts() {

      // this.cartProvider.products().subscribe(
      //   response => {
      //     if (response) {
      //       if (response.totals[0].text) {
      //         this.totalQty = response.totals[0].text;
      //       }
      //     }
      //   },
      //   err => console.error(err),
      //   () => {
      //   }
      // );
    
  }
}