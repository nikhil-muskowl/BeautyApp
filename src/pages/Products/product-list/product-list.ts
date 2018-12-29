import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CategoryProvider } from '../../../providers/category/category';
import { LoadingProvider } from '../../../providers/loading/loading';
import { ProductDetailsPage } from '../product-details/product-details';
import { ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../../providers/language/language';

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  public rateValue;
  public filterData;

  public sorts;
  public limits;
  public pagination;
  public results;
  public search;
  public sort;
  public order;
  public limit;
  public page = 1;
  public finalPage = 1;

  public id;
  public heading_title;
  public responseData;
  public products;
  public productModel: any[] = [];
  public isInfinite = true;

  //txt
  sort_products;
  load_more;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public categoryProvider: CategoryProvider,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public loadingProvider: LoadingProvider,
    public translate: TranslateService,
    public languageProvider: LanguageProvider,
  ) {

    this.id = navParams.get('id');
    this.heading_title = navParams.get('name');

    this.setText();
    this.getServerData();
  }

  setText() {
    this.translate.setDefaultLang(this.languageProvider.getLanguage());
    console.log("getLanguage() : " + this.languageProvider.getLanguage());
    this.translate.use(this.languageProvider.getLanguage());

    this.translate.get('sort_products').subscribe((text: string) => {
      this.sort_products = text;
    });

  }

  goBack() {
    this.navCtrl.pop();
  }

  getServerData() {
    this.filterData = {
      'search': this.search,
      'page': this.page,
      'sort': this.sort,
      'order': this.order,
      'category_filter': this.id,
    };

    this.loadingProvider.show();
    this.categoryProvider.apiProductList(this.filterData).subscribe(
      response => {
        this.responseData = response;
        this.products = this.responseData.products;
        this.pagination = this.responseData.pagination;
        this.sorts = this.responseData.sorts;
        this.limits = this.responseData.limits;
        this.binddata();
        console.log("catList : " + JSON.stringify(this.products));
        this.loadingProvider.dismiss();
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
  }

  presentSortActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.sort_products,
    });

    for (let index = 0; index < this.sorts.length; index++) {

      var sortsButtons = {
        text: this.categoryProvider.decodeEntities(this.sorts[index].text),
        handler: () => {
          this.sort = this.sorts[index].value;
          let sortArray = this.sort.split("-");
          this.sort = sortArray[0];
          this.order = sortArray[1];

          this.productModel = [];
          this.getServerData();
        }
      };
      actionSheet.addButton(sortsButtons);
    }
    actionSheet.present();
  }

  presentLimitActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Limit of Products',
    });

    for (let index = 0; index < this.limits.length; index++) {
      var limitButtons = {
        text: this.limits[index].text,
        handler: () => {
          this.limit = this.limits[index].value;
          this.page = 1;
          this.productModel = [];
          this.getServerData();
        }
      };
      actionSheet.addButton(limitButtons);
    }
    actionSheet.present();
  }

  binddata() {
    for (let index = 0; index < this.products.length; index++) {
      this.productModel.push({
        product_id: this.products[index].product_id,
        thumb: this.products[index].thumb,
        name: this.products[index].name,
        description: this.products[index].description,
        price: this.products[index].price,
        special: this.products[index].special,
        tax: this.products[index].tax,
        // discountrate: this.products[index].discountrate,
        // offerimage: this.products[index].offerimage,
        // vegsignimage: this.products[index].vegsignimage,
        minimum: this.products[index].minimum,
        rating: this.products[index].rating
      });
    }
  }

  openPage(product) {
    console.log("this products : " + JSON.stringify(product));
  }

  onRateChange(rate) {
    this.rateValue = 0;
    this.rateValue = parseFloat(rate);
  }

  getProductDetail(product) {
    this.navCtrl.push(ProductDetailsPage, { id: product.product_id });
  }

  doInfinite(infiniteScroll) {

    // if (this.products.length > 0 && this.pagination.length > 0 && this.pagination.length != this.page) {
    //   this.page++;
    //   this.getListing();
    //   this.isInfinite = true;
    // } else {
    //   this.isInfinite = false;
    // }
    // setTimeout(() => {
    //   infiniteScroll.complete();
    // }, 500);

    if (this.pagination.length > 0) {
      this.pagination.forEach(element => {
        this.finalPage = element;
      });
    }

    if (this.page != this.finalPage) {
      this.page++;
      this.getServerData();
      this.isInfinite = true;
      setTimeout(() => {
        infiniteScroll.complete();
      }, 500);
    } else {
      this.isInfinite = false;
    }

  }
}
