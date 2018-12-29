import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactValidator } from '../../../validators/contact';

import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../../providers/language/language';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  submitAttempt;
  accountForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private responseDbData;

  //txt
  public heading_title;
  public fullname_txt;
  public firstname_txt;
  public lastname_txt;
  public email_txt;
  public phone_txt;
  public dob_txt;
  public gender_txt;
  public male_txt;
  public female_txt;
  public country_txt;
  public zone_txt;
  public district_txt;
  public postcode_txt;
  public city_txt;
  public address_txt;
  public update_txt;

  // form fields  
  public firstname = '';
  public lastname = '';
  public email = '';
  public telephone = '';
  private dob = '';
  private gender = '';
  private address;
  private postcode;
  private city;
  private country_id = 1;
  private district_id = 1;
  private zone_id = 1;

  // errors
  private error_fullname = 'field is required';
  private error_firstname = 'field is required';
  private error_lastname = 'field is required';
  private error_email = 'field is required';
  private error_telephone = 'field is required';
  private error_dob = 'field is required';
  private error_gender = 'field is required';
  private error_address = 'field is required';
  private error_country_id = 'field is required';
  private error_district_id = 'field is required';
  private error_zone_id = 'field is required';
  private error_postcode = 'field is required';
  private error_city = 'field is required';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    public languageProvider: LanguageProvider, ) {

    this.setText();
    this.createForm();
  }

  @ViewChild('datePicker') datePicker;
  open() {
    if (!this.dob) {
      this.dob = new Date().toJSON().split('T')[0];
      setTimeout(() => {
        this.datePicker.open();
      }, 50)
    } else {
      this.datePicker.open();
    }

  }

  createForm() {
    this.accountForm = this.formBuilder.group({
      firstname: [this.firstname, Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: [this.lastname, Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [this.email, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      telephone: [this.telephone, ContactValidator.isValid],
      // dob: [this.dob, Validators.required],
      // gender: [this.gender, Validators.required],
      // country_id: [this.country_id, Validators.required],
      // zone_id: [this.zone_id, Validators.required],
      // district_id: [this.district_id, Validators.required],
      // postcode: [this.postcode, Validators.required],
      // city: [this.city, Validators.required],
      // address: [this.address, Validators.required],
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  setText() {
    this.translate.setDefaultLang(this.languageProvider.getLanguage());
    this.translate.use(this.languageProvider.getLanguage());

    this.translate.get('edit_profile').subscribe((text: string) => {
      this.heading_title = text;
    });
    this.translate.get('firstname').subscribe((text: string) => {
      this.firstname_txt = text;
    });
    this.translate.get('lastname').subscribe((text: string) => {
      this.lastname_txt = text;
    });
    this.translate.get('email').subscribe((text: string) => {
      this.email_txt = text;
    });
    this.translate.get('mobile').subscribe((text: string) => {
      this.phone_txt = text;
    });
    this.translate.get('dob').subscribe((text: string) => {
      this.dob_txt = text;
    });
    this.translate.get('gender').subscribe((text: string) => {
      this.gender_txt = text;
    });
    this.translate.get('male').subscribe((text: string) => {
      this.male_txt = text;
    });
    this.translate.get('female').subscribe((text: string) => {
      this.female_txt = text;
    });
    this.translate.get('country').subscribe((text: string) => {
      this.country_txt = text;
    });
    this.translate.get('zone').subscribe((text: string) => {
      this.zone_txt = text;
    });
    this.translate.get('district').subscribe((text: string) => {
      this.district_txt = text;
    });
    this.translate.get('postcode').subscribe((text: string) => {
      this.postcode_txt = text;
    });
    this.translate.get('city').subscribe((text: string) => {
      this.city_txt = text;
    });
    this.translate.get('address').subscribe((text: string) => {
      this.address_txt = text;
    });
    this.translate.get('update').subscribe((text: string) => {
      this.update_txt = text;
    });
    this.translate.get('error_firstname').subscribe((text: string) => {
      this.error_firstname = text;
    });
    this.translate.get('error_lastname').subscribe((text: string) => {
      this.error_lastname = text;
    });
    this.translate.get('error_dob').subscribe((text: string) => {
      this.error_dob = text;
    });
    this.translate.get('error_gender').subscribe((text: string) => {
      this.error_gender = text;
    });
    this.translate.get('error_address').subscribe((text: string) => {
      this.error_address = text;
    });
    this.translate.get('error_country').subscribe((text: string) => {
      this.error_country_id = text;
    });
    this.translate.get('error_district').subscribe((text: string) => {
      this.error_district_id = text;
    });
    this.translate.get('error_zone').subscribe((text: string) => {
      this.error_zone_id = text;
    });
    this.translate.get('error_postcode').subscribe((text: string) => {
      this.error_postcode = text;
    });
    this.translate.get('error_city').subscribe((text: string) => {
      this.error_city = text;
    });
    this.translate.get('error_contact').subscribe((text: string) => {
      this.error_telephone = text;
    });
    this.translate.get('error_name').subscribe((text: string) => {
      this.error_fullname = text;
    });
    this.translate.get('error_email').subscribe((text: string) => {
      this.error_email = text;
    });
  }

  save() {
    this.submitAttempt = true;
    if (this.accountForm.valid) {
      //this.loadingProvider.present();

      this.formData = this.accountForm.valid;

      // this.customerProvider.changeAccountData(this.accountForm.value).subscribe(
      //   response => {
      //     this.responseData = response;
      //     this.submitAttempt = true;
      //     if (this.responseData.success && this.responseData.success != '') {
      //       this.success = this.responseData.success;
      //       this.alertProvider.title = 'Success';
      //       this.alertProvider.message = this.success;
      //       this.alertProvider.showAlert();
      //       //this.logout();
      //       this.navCtrl.setRoot(CustomerAccountPage);
      //     }

      //     if (this.responseData.error_fullname != '') {
      //       this.accountForm.controls['fullname'].setErrors({ 'incorrect': true });
      //       this.error_fullname = this.responseData.error_fullname;
      //     }

      //     if (this.responseData.error_email != '') {
      //       this.accountForm.controls['email'].setErrors({ 'incorrect': true });
      //       this.error_email = this.responseData.error_email;
      //     }

      //     if (this.responseData.error_telephone != '') {
      //       this.accountForm.controls['telephone'].setErrors({ 'incorrect': true });
      //       this.error_telephone = this.responseData.error_telephone;
      //     }

      //     if (this.responseData.error_dob != '') {
      //       this.accountForm.controls['dob'].setErrors({ 'incorrect': true });
      //       this.error_dob = this.responseData.error_dob;
      //     }

      //     if (this.responseData.error_gender != '') {
      //       this.accountForm.controls['gender'].setErrors({ 'incorrect': true });
      //       this.error_gender = this.responseData.error_gender;
      //     }

      //     if (this.responseData.error_country_id != '') {
      //       this.accountForm.controls['country_id'].setErrors({ 'incorrect': true });
      //       this.error_country_id = this.responseData.error_country_id;
      //     }

      //     if (this.responseData.error_zone_id != '') {
      //       this.accountForm.controls['zone_id'].setErrors({ 'incorrect': true });
      //       this.error_zone_id = this.responseData.error_zone_id;
      //     }

      //     if (this.responseData.error_district_id != '') {
      //       this.accountForm.controls['district_id'].setErrors({ 'incorrect': true });
      //       this.error_district_id = this.responseData.error_district_id;
      //     }

      //     if (this.responseData.error_postcode != '') {
      //       this.accountForm.controls['postcode'].setErrors({ 'incorrect': true });
      //       this.error_postcode = this.responseData.error_postcode;
      //     }

      //     if (this.responseData.error_city != '') {
      //       this.accountForm.controls['city'].setErrors({ 'incorrect': true });
      //       this.error_city = this.responseData.error_city;
      //     }

      //     if (this.responseData.error_address != '') {
      //       this.accountForm.controls['address'].setErrors({ 'incorrect': true });
      //       this.error_address = this.responseData.error_address;
      //     }


      //     if (this.responseData.error_warning && this.responseData.error_warning != '') {
      //       this.error = this.responseData.error_warning;

      //       this.alertProvider.title = 'Warning';
      //       this.alertProvider.message = this.error;
      //       this.alertProvider.showAlert();
      //     }

      //   },
      //   err => {
      //     console.error(err);
      //     // this.loadingProvider.dismiss();
      //   },
      //   () => {
      //     // this.loadingProvider.dismiss();
      //   }
      // );
    }

  }
}
