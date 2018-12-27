import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ScrollHideDirective } from '../directives/scroll-hide/scroll-hide';
import { Ionic2RatingModule } from 'ionic2-rating';

//Main
import { HomePage } from '../pages/Main/home/home';
import { ListPage } from '../pages/Main/list/list';

//Orders
import { CartPage } from '../pages/Orders/cart/cart';
import { PaymentAddressPage } from '../pages/Orders/payment-address/payment-address';
import { ShippingAddressPage } from '../pages/Orders/shipping-address/shipping-address';

//Account
import { ChangePasswordPage } from '../pages/Account/change-password/change-password';
import { EditProfilePage } from '../pages/Account/edit-profile/edit-profile';
import { ForgotPasswordPage } from '../pages/Account/forgot-password/forgot-password';
import { LoginPage } from '../pages/Account/login/login';
import { ProfilePage } from '../pages/Account/profile/profile';
import { RegistrationPage } from '../pages/Account/registration/registration';
import { WishlistPage } from '../pages/Account/wishlist/wishlist';

//Products
import { CategoriesPage } from '../pages/Products/categories/categories';
import { ProductListPage } from '../pages/Products/product-list/product-list';
import { ProductDetailsPage } from '../pages/Products/product-details/product-details';

//Component
import { PrivacyPolicyPage } from '../pages/Terms/privacy-policy/privacy-policy';
import { TermsAndConditionPage } from '../pages/Terms/terms-and-condition/terms-and-condition';

//Component
import { CartInfoComponent } from '../components/cart-info/cart-info';
import { ProductReviewComponent } from '../components/product-review/product-review';

//providers
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingProvider } from '../providers/loading/loading';
import { ToastProvider } from '../providers/toast/toast';
import { AlertProvider } from '../providers/alert/alert';
import { LanguageProvider } from '../providers/language/language';
import { ConfigProvider } from '../providers/config/config';
import { LoginProvider } from '../providers/login/login';
import { CategoryProvider } from '../providers/category/category';
import { CartProvider } from '../providers/cart/cart';
import { WishlistProvider } from '../providers/wishlist/wishlist';
import { ModalProvider } from '../providers/modal/modal';
import { OrderProvider } from '../providers/order/order';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/language/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ScrollHideDirective,
    ChangePasswordPage,
    EditProfilePage,
    ForgotPasswordPage,
    LoginPage,
    ProfilePage,
    RegistrationPage,
    CategoriesPage,
    ProductListPage,
    ProductDetailsPage,
    CartPage,
    WishlistPage,
    CartInfoComponent,
    ProductReviewComponent,
    PrivacyPolicyPage,
    TermsAndConditionPage,
    PaymentAddressPage,
    ShippingAddressPage,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    Ionic2RatingModule,
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
    CategoriesPage,
    ProductListPage,
    ProductDetailsPage,
    CartPage,
    WishlistPage,
    CartInfoComponent,
    ProductReviewComponent,
    PrivacyPolicyPage,
    TermsAndConditionPage,
    PaymentAddressPage,
    ShippingAddressPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoadingProvider,
    ToastProvider,
    AlertProvider,
    LanguageProvider,
    ConfigProvider,
    LoginProvider,
    CategoryProvider,
    CartProvider,
    WishlistProvider,
    ModalProvider,
    OrderProvider
  ]
})
export class AppModule { }
