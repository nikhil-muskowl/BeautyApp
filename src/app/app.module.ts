import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
import { LoadingProvider } from '../providers/loading/loading';
import { ToastProvider } from '../providers/toast/toast';
import { AlertProvider } from '../providers/alert/alert';
import { LanguageProvider } from '../providers/language/language';
import { ConfigProvider } from '../providers/config/config';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/language/', '.json');
}

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
    HttpClientModule,,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    TranslateModule
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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoadingProvider,
    ToastProvider,
    AlertProvider,
    LanguageProvider,
    ConfigProvider
  ]
})
export class AppModule { }
