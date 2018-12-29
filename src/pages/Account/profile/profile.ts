import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { AlertController, Alert } from 'ionic-angular';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../../providers/language/language';
import { LoginProvider } from '../../../providers/login/login';
import { LoginPage } from '../login/login';
import { HomePage } from '../../Main/home/home';
import { WishlistPage } from '../wishlist/wishlist';
import { OrderPage } from '../../Orders/order/order';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { ChangePasswordPage } from '../change-password/change-password';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 60 };

  public heading_title;
  public customer;
  public email;
  public telephone;
  public responseData;

  public totalQty = 0;
  public alert: Alert;

  public user_id;
  //txt
  public acc_setting_txt;
  public wishlist_txt;
  public my_orders_txt;
  public my_requests_txt;
  public edit_acc_txt;
  public chang_pass_txt;
  public logout_txt;
  public cancel_txt;
  public ok_txt;
  public yes_txt;
  public continue_txt;
  public confirm_logout;
  public want_to_logout;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
    public alertCtrl: AlertController,
    public loginProvider: LoginProvider,
    public translate: TranslateService,
    public languageProvider: LanguageProvider, ) {

    this.setText();
    this.isLogin();
    platform.registerBackButtonAction(() => {
      // this.navCtrl.setRoot(HomePage);
    });
  }


  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.getProducts();
    })
  }

  setText() {
    this.translate.setDefaultLang(this.languageProvider.getLanguage());
    this.translate.use(this.languageProvider.getLanguage());

    this.translate.get('my_acc').subscribe((text: string) => {
      this.heading_title = text;
    });
    this.translate.get('acc_setting').subscribe((text: string) => {
      this.acc_setting_txt = text;
    });
    this.translate.get('wishlist').subscribe((text: string) => {
      this.wishlist_txt = text;
    });
    this.translate.get('my_orders').subscribe((text: string) => {
      this.my_orders_txt = text;
    });
    this.translate.get('my_requests').subscribe((text: string) => {
      this.my_requests_txt = text;
    });
    this.translate.get('edit_acc').subscribe((text: string) => {
      this.edit_acc_txt = text;
    });
    this.translate.get('chang_pass').subscribe((text: string) => {
      this.chang_pass_txt = text;
    });
    this.translate.get('logout').subscribe((text: string) => {
      this.logout_txt = text;
    });
    this.translate.get('ok').subscribe((text: string) => {
      this.ok_txt = text;
    });
    this.translate.get('cancel').subscribe((text: string) => {
      this.cancel_txt = text;
    });
    this.translate.get('continue').subscribe((text: string) => {
      this.continue_txt = text;
    });
    this.translate.get('confirm_logout').subscribe((text: string) => {
      this.confirm_logout = text;
    });
    this.translate.get('want_to_logout').subscribe((text: string) => {
      this.want_to_logout = text;
    });
    this.translate.get('yes').subscribe((text: string) => {
      this.yes_txt = text;
    });

  }

  isLogin() {
    this.user_id = this.loginProvider.getData();
    if (!this.user_id) {
      this.navCtrl.setRoot(LoginPage);
    } else {
      // this.loginProvider.getCustomerData(this.loginProvider.customer_id).subscribe(
      //   response => {
      //     if (response) {
      //       this.responseData = response;
      //       this.customer = this.responseData.fullname;
      //       this.email = this.responseData.email;
      //       this.telephone = this.responseData.telephone;
      //     }
      //   },
      //   err => {
      //     if (err.name == 'TimeoutError') {
      //       this.alert = this.alertCtrl.create({
      //         title: 'Oops!',
      //         message: 'Server response is too slow! Do you want to continue?',
      //         buttons: [
      //           {
      //             text: "Exit App",
      //             handler: () => {
      //               this.platform.exitApp();
      //             }
      //           },
      //           {
      //             text: "Continue",
      //             handler: () => {
      //               this.isLogin();
      //             }
      //           }
      //         ]
      //       });
      //       this.alert.present();
      //     } else {
      //       this.alert = this.alertCtrl.create({
      //         title: 'Oops!',
      //         message: 'Something went wrong! Exiting..',
      //         buttons: [
      //           {
      //             text: "Okay",
      //             handler: () => {
      //               this.platform.exitApp();
      //             }
      //           },
      //         ]
      //       });
      //       this.alert.present();
      //     }
      //   },
      //   () => {
      //   }
      // );
    }
  }

  public getProducts() {

    this.user_id = this.loginProvider.getData();
    if (!this.user_id) {
      this.navCtrl.setRoot(LoginPage);
    } else {
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
      // return event;
    }
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: this.confirm_logout,
      message: this.want_to_logout,
      buttons: [
        {
          text: this.cancel_txt,
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: this.yes_txt,
          handler: () => {
            this.loginProvider.logout();
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();

  }

  gotoWishlist() {
    this.navCtrl.push(WishlistPage, {from: 'profile'});
  }

  gotoOrders() {
    this.navCtrl.push(OrderPage);
  }

  gotoEditAccount() {
    this.navCtrl.push(EditProfilePage);
  }

  gotoChangePassword() {
    this.navCtrl.push(ChangePasswordPage);
  }
}
