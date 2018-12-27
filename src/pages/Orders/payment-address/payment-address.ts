import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../../providers/language/language';
import { LoginProvider } from '../../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-payment-address',
  templateUrl: 'payment-address.html',
})
export class PaymentAddressPage {

  public customer_id;
  public fname;
  public lname;

  //txt
  public heading_title;
  public firstname_txt;
  public lastname_txt;
  public address_txt;
  public address2_txt;
  public zone_txt;
  public postcode_txt;
  public city_txt;
  public continue_txt;

  // form fields  
  private address;
  private postcode;
  private city;
  private country_id = 1;
  private district_id = 1;
  private zone_id = 1;

  // errors
  private error_firstname;
  private error_lastname;
  private field_error;
  private error_address;
  private error_zone;
  private error_postcode;
  private error_city;

  private success;
  private error_warning;
  // form data
  submitAttempt;
  addressForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public platform: Platform,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
    public loginProvider: LoginProvider,
    public translate: TranslateService,
    public languageProvider: LanguageProvider, ) {

    this.createForm();

    platform.registerBackButtonAction(() => {
      this.goBack();
    });

    this.setText();
  }

  setText() {
    this.translate.setDefaultLang(this.languageProvider.getLanguage());
    this.translate.use(this.languageProvider.getLanguage());

    this.translate.get('billing_address').subscribe((text: string) => {
      this.heading_title = text;
    });
    this.translate.get('firstname').subscribe((text: string) => {
      this.firstname_txt = text;
    });
    this.translate.get('lastname').subscribe((text: string) => {
      this.lastname_txt = text;
    });
    this.translate.get('address').subscribe((text: string) => {
      this.address_txt = text;
    });
    this.translate.get('address2').subscribe((text: string) => {
      this.address2_txt = text;
    });
    this.translate.get('zone').subscribe((text: string) => {
      this.zone_txt = text;
    });
    this.translate.get('postcode').subscribe((text: string) => {
      this.postcode_txt = text;
    });
    this.translate.get('city').subscribe((text: string) => {
      this.city_txt = text;
    });
    this.translate.get('continue').subscribe((text: string) => {
      this.continue_txt = text;
    });
    this.translate.get('error_firstname').subscribe((text: string) => {
      this.error_firstname = text;
    });
    this.translate.get('error_lastname').subscribe((text: string) => {
      this.error_lastname = text;
    });
    this.translate.get('field_error').subscribe((text: string) => {
      this.field_error = text;
    });
    this.translate.get('error_address').subscribe((text: string) => {
      this.error_address = text;
    });
    this.translate.get('error_zone').subscribe((text: string) => {
      this.error_zone = text;
    });
    this.translate.get('error_postcode').subscribe((text: string) => {
      this.error_postcode = text;
    });
    this.translate.get('error_city').subscribe((text: string) => {
      this.error_city = text;
    });
  }


  createForm() {
    this.addressForm = this.formBuilder.group({
      firstname: [this.fname, Validators.required],
      lastname: [this.lname, Validators.required],
      address: ['', Validators.required],
      address2: ['', ''],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      zone_id: ['', Validators.required],
    });
  }


  goBack() {
    this.navCtrl.pop();
  }
}
