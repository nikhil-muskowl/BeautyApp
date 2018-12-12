import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { AlertController, Alert } from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform, ) {

    this.heading_title = 'My Account';

    platform.registerBackButtonAction(() => {
      // this.navCtrl.setRoot(HomePage);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
