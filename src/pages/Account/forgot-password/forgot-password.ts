import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertProvider } from '../../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../../providers/language/language';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  heading_title;
  submitAttempt;
  forgPasswordForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private responseDbData;

  private error_email;
  private success;
  private error;

  //txt
  public update_txt;
  public email_txt;
  public send_txt;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    public alertProvider: AlertProvider,
    public languageProvider: LanguageProvider,
  ) {

    platform.registerBackButtonAction(() => {
      this.goBack();
    });

    this.setText();
    this.createForm();
  }

  setText() {
    this.translate.setDefaultLang(this.languageProvider.getLanguage());
    this.translate.use(this.languageProvider.getLanguage());

    this.translate.get('forgot_password').subscribe((text: string) => {
      this.heading_title = text;
    });
    this.translate.get('error_email').subscribe((text: string) => {
      this.error_email = text;
    });
    this.translate.get('email').subscribe((text: string) => {
      this.email_txt = text;
    });
    this.translate.get('send').subscribe((text: string) => {
      this.send_txt = text;
    });
  }

  createForm() {
    this.forgPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
  send() {

    this.submitAttempt = true;
    // if (this.forgPasswordForm.valid) {
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

    //       if (this.responseData.error_email != '') {
    //         this.registerForm.controls['email'].setErrors({ 'incorrect': true });
    //         this.error_email = this.responseData.error_email;
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
}
