import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DrinksProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DrinksProvider {
  url = 'http://tipsyapp1.herokuapp.com/api/drink/';

  constructor(public http: Http) {
    console.log('Hello DrinksProvider Provider');
  }

  getDrinks() {
    return this.http.get(this.url)
      .map(res => res.json());
  }
  getDetailDrink(drinkUrl) {
    return this.http.get(drinkUrl)
      .map(res => res.json());
  }
}
