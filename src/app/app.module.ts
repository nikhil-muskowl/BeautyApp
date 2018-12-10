import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
//Main
import { HomePage } from '../pages/Main/home/home';
import { ListPage } from '../pages/Main/list/list';

//Account
import { ChangePasswordPage } from '../pages/Account/change-password/change-password';
import { EditProfilePage } from '../pages/Account/edit-profile/edit-profile';
import { ForgotPasswordPage } from '../pages/Account/forgot-password/forgot-password';
import { LoginPage } from '../pages/Account/login/login';
import { ProfilePage } from '../pages/Account/profile/profile';
import { RegistrationPage } from '../pages/Account/registration/registration';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChangePasswordPage,
    EditProfilePage,
    ForgotPasswordPage,
    LoginPage,
    ProfilePage,
    RegistrationPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChangePasswordPage,
    EditProfilePage,
    ForgotPasswordPage,
    LoginPage,
    ProfilePage,
    RegistrationPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
