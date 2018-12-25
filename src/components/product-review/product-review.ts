import { Component, Input } from '@angular/core';
import { CategoryProvider } from '../../providers/category/category';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../providers/language/language';

@Component({
  selector: 'product-review',
  templateUrl: 'product-review.html'
})
export class ProductReviewComponent {
  @Input('productid') product_id: string;

  text: string;
  public reviews;
  public pagination;
  public results;

  public rateValue;

  submitAttempt;
  reviewForm: FormGroup;
  public formData: any;
  public status;
  public message;
  public responseData;
  public error_name;
  public error_review;
  public error_rate;
  public success;
  public error;

  //txt
  public no_reviews;
  public write_review;
  public name_txt;
  public write_review_here;
  public post;

  constructor(public formBuilder: FormBuilder,
    public categoryProvider: CategoryProvider,
    public loadingProvider: LoadingProvider,
    public alertProvider: AlertProvider,

    public translate: TranslateService,
    public languageProvider: LanguageProvider, ) {
    console.log('Hello ProductReviewComponent Component');
    this.text = 'Hello World';
    this.setText();
  }

  setText() {
    this.translate.setDefaultLang(this.languageProvider.getLanguage());
    console.log("getLanguage() : " + this.languageProvider.getLanguage());
    this.translate.use(this.languageProvider.getLanguage());

    this.translate.get('no_reviews').subscribe((text: string) => {
      this.no_reviews = text;
    });
    this.translate.get('write_review').subscribe((text: string) => {
      this.write_review = text;
    });
    this.translate.get('name').subscribe((text: string) => {
      this.name_txt = text;
    });
    this.translate.get('error_name').subscribe((text: string) => {
      this.error_name = text;
    });
    this.translate.get('error_review').subscribe((text: string) => {
      this.error_review = text;
    });
    this.translate.get('error_rate').subscribe((text: string) => {
      this.error_rate = text;
    });
    this.translate.get('write_review_here').subscribe((text: string) => {
      this.write_review_here = text;
    });
    this.translate.get('post').subscribe((text: string) => {
      this.post = text;
    });
  }

  ngOnChanges() {
    // console.log(this.product_id);  
    this.getServerData(this.product_id);
    this.createForm();
  }


  public getServerData(product_id) {
    this.loadingProvider.present();
    this.categoryProvider.getReviews(product_id).subscribe(
      response => {
        // console.log(response);
        this.reviews = response.reviews;
        this.pagination = response.pagination;
        this.results = response.results;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  public createForm() {
    this.reviewForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      text: ['', Validators.required],
      rating: ['', Validators.required]
    });

  }

  public onRateChange(rate) {
    this.rateValue = rate;
  }

  public save() {
    this.submitAttempt = true;
    this.formData = this.reviewForm.valid;

    // if (this.reviewForm.valid) {
    //   this.loadingProvider.present();
    //   this.categoryProvider.postReviews(this.product_id, this.reviewForm.value).subscribe(
    //     response => {
    //       this.responseData = response;

    //       this.submitAttempt = true;

    //       if (this.responseData.success && this.responseData.success != '') {
    //         this.success = this.responseData.success;
    //         this.alertProvider.title = 'Success';
    //         this.alertProvider.message = this.success;
    //         this.alertProvider.showAlert();
    //         this.reviewForm.reset();
    //         this.submitAttempt = false;
    //       }

    //       if (this.responseData.error && this.responseData.error != '') {
    //         this.error = this.responseData.error;

    //         this.alertProvider.title = 'Warning';
    //         this.alertProvider.message = this.error;
    //         this.alertProvider.showAlert();
    //       }


    //       if (this.responseData.error_name != '') {
    //         this.reviewForm.controls['name'].setErrors({ 'incorrect': true });
    //         this.error_name = this.responseData.error_name;
    //       }

    //       if (this.responseData.error_text != '') {
    //         this.reviewForm.controls['text'].setErrors({ 'incorrect': true });
    //         this.error_text = this.responseData.error_text;
    //       }

    //       if (this.responseData.error_rating != '') {
    //         this.reviewForm.controls['rating'].setErrors({ 'incorrect': true });
    //         this.error_rating = this.responseData.error_rating;
    //       }

    //     },
    //     err => console.error(err),
    //     () => {
    //       this.loadingProvider.dismiss();
    //     }
    //   );
    // }

  }
}
