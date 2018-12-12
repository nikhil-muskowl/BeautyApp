import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../../Main/home/home';
import { LoginPage } from '../login/login';
import { ContactValidator } from '../../../validators/contact';

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  public heading_title;
  submitAttempt;
  registerForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;

  //text
  public male_txt;
  public female_txt;
  public gender_txt;
  public dob_txt;
  public conf_password_txt;
  public password_txt;
  public phone_txt;
  public email_txt;
  public username_txt;
  public fullname_txt;

  private dob: any;
  private maxDate: string;

  //warning msg
  private error_fullname = 'field is required';
  private error_username = 'field is required';
  private error_email = 'field is required';
  private error_telephone = 'field is required';
  private error_password = 'field is required';
  private error_confirm = 'field is required';
  private error_warning = 'You must agree to the Privacy Policy!';

  private error_dob = 'please select date of birth';
  private error_gender = 'field is required';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public platform: Platform, ) {

    this.heading_title = 'Register With Us';
    this.createForm();
    platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot(LoginPage);
    });
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

  goBack() {
    this.navCtrl.pop();
  }

  backButtonClick() {
    this.navCtrl.pop();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      username: ['', Validators.compose([Validators.maxLength(32), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      telephone: ['', ContactValidator.isValid],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  public goToTermCondition() {

  }

  save() {
    this.submitAttempt = true;
    // if (this.registerForm.valid) {
    //   // this.loadingProvider.present();

    //   this.formData = this.registerForm.valid;

    //   this.customerProvider.apiRegister(this.registerForm.value).subscribe(
    //     response => {
    //       this.responseData = response;

    //       this.submitAttempt = true;

    //       if (this.responseData.customer_id) {
    //         this.customer_id = this.responseData.customer_id;
    //         this.registerForm.reset();
    //         this.submitAttempt = false;

    //         var data = {
    //           customer_id: this.responseData.customer_id,
    //         };

    //         this.customerProvider.setData(data);
    //         //this.navCtrl.push(CustomerLoginPage);
    //         this.navCtrl.push(CustomerAccountPage);
    //       }

    //       if (this.responseData.text_message != '') {
    //         this.text_message = this.responseData.text_message;
    //         this.alertProvider.title = 'Success';
    //         this.alertProvider.message = this.text_message;
    //         this.alertProvider.showAlert();
    //       }

    //       if (this.responseData.error_fullname != '') {
    //         this.registerForm.controls['fullname'].setErrors({ 'incorrect': true });
    //         this.error_fullname = this.responseData.error_fullname;
    //       }

    //       if (this.responseData.error_username != '') {
    //         this.registerForm.controls['username'].setErrors({ 'incorrect': true });
    //         this.error_username = this.responseData.error_username;
    //       }

    //       if (this.responseData.error_email != '') {
    //         this.registerForm.controls['email'].setErrors({ 'incorrect': true });
    //         this.error_email = this.responseData.error_email;
    //       }

    //       if (this.responseData.error_telephone != '') {
    //         this.registerForm.controls['telephone'].setErrors({ 'incorrect': true });
    //         this.error_telephone = this.responseData.error_telephone;
    //       }

    //       if (this.responseData.error_password != '') {
    //         this.registerForm.controls['password'].setErrors({ 'incorrect': true });
    //         this.error_password = this.responseData.error_password;
    //       }

    //       if (this.responseData.error_confirm != '') {
    //         this.registerForm.controls['confirm'].setErrors({ 'incorrect': true });
    //         this.error_confirm = this.responseData.error_confirm;
    //       }

    //       if (this.responseData.error_dob != '') {
    //         this.registerForm.controls['dob'].setErrors({ 'incorrect': true });
    //         this.error_dob = this.responseData.error_dob;
    //       }

    //       if (this.responseData.error_gender != '') {
    //         this.registerForm.controls['gender'].setErrors({ 'incorrect': true });
    //         this.error_gender = this.responseData.error_gender;
    //       }

    //       if (this.responseData.error_warning && this.responseData.error_warning != '') {
    //         this.error_warning = this.responseData.error_warning;

    //         this.alertProvider.title = 'Warning';
    //         this.alertProvider.message = this.error_warning;
    //         this.alertProvider.showAlert();
    //       }

    //     },
    //     err => {
    //       console.error(err);
    //       //this.loadingProvider.dismiss();
    //     },
    //     () => {
    //       // this.loadingProvider.dismiss();
    //     }
    //   );
    // }

  }

  public goToPrivacyPolicy() {

  }

  public goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

}
