import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the DrinksProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DrinksProvider {
  // private drinks: any = [];
  private pages: any = [];

  url = 'http://tipsyapp1.herokuapp.com/api/drink/';

  constructor(public http: Http) {
    console.log('Hello DrinksProvider Provider');
  }

  getFirstPage() {
    return this.http.get(this.url)
      .map(res => res.json())
      .do((data) => this.pages = [data]);
  }
  addMorePages() {
    let url = '';
    const lastPage = this.pages[this.pages.length - 1];
    console.log(this.pages);
    if (lastPage && lastPage.next) {
      url = lastPage.next;
    }
    console.log(url);
    return this.http.get(url)
      .map(res => res.json())
      .do((data) => this.pages.push(data))
  }
  getPagesCopy() {
    return this.pages.slice();
  }
  getDetailDrink(drinkUrl) {
    return this.http.get(drinkUrl)
      .map(res => res.json());
  }
}
