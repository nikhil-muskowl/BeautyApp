import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegistrationPage } from '../registration/registration';
import { HomePage } from '../../Main/home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public heading_title;
  submitAttempt;
  loginForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private responseDbData;

  //text
  public email_txt;
  public password_txt;
  public sign_in_txt;

  //warning msg
  private error_email = 'field is required';
  private error_password = 'field is required';
  private success;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public platform: Platform, ) {

    this.heading_title = 'Login';
    this.createForm();
    platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot(HomePage);
    });
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.required]
    });
  }

  save() {

  }

  goToRegsiter() {
    this.navCtrl.push(RegistrationPage);
  }
}
