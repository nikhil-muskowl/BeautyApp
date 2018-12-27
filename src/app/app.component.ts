import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, IonicApp, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
//Main
import { HomePage } from '../pages/Main/home/home';
import { ListPage } from '../pages/Main/list/list';
//Account
import { LoginPage } from '../pages/Account/login/login';
//Product
import { CategoriesPage } from '../pages/Products/categories/categories';
import { ProfilePage } from '../pages/Account/profile/profile';
import { WishlistPage } from '../pages/Account/wishlist/wishlist';
import { OrderPage } from '../pages/Orders/order/order';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loginProvider: LoginProvider) {

    this.initializeApp();

    // used for an example of ngFor and navigation

    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage },
    //   { title: 'Login', component: LoginPage },
    //   { title: 'Category', component: CategoriesPage },
    // ];
  }

  public bindMenu() {
    this.pages.push({ title: 'Home', component: HomePage });
    this.pages.push({ title: 'List', component: ListPage });
    if (this.loginProvider.customer_id) {
      this.pages.push({ title: 'profile', component: ProfilePage });
      this.pages.push({ title: 'my wishlist', component: WishlistPage });
      this.pages.push({ title: 'my orders', component: OrderPage, });
    }
    else {
      this.pages.push({ title: 'Login', component: LoginPage });
    }
    this.pages.push({ title: 'Category', component: CategoriesPage });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.bindMenu();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
