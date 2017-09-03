import { Injectable } from '@angular/core';
import {Http, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Urls} from '../../globals/urls'
import { Storage } from '@ionic/storage';
import {AuthProvider} from '../auth/auth';

/*
  Generated class for the IngredientsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IngredientsProvider {
  private suggestedIngredients: any[] = [];
  private userIngredients: any = [];

  constructor(public http: Http,
              public storage: Storage,
              public auth: AuthProvider) {
    console.log('Hello IngredientsProvider Provider');
  }

  fetchSuggestedIngredients() {
    console.log('fetching suggested ingredients');
    const params: URLSearchParams = new URLSearchParams();
    params.set('suggested', 'true');
    const options = new RequestOptions(
      {headers: this.auth.headers,
        search: params}
    );
    return this.http.get(Urls.ingredients, options)
      .map(res => res.json())
      .do(data => this.suggestedIngredients = data.results);
  }

  getSuggestedIngredients() {
    return this.suggestedIngredients.slice();
  }

  addOrRemoveIngredient(url:string) {
    const options = new RequestOptions({headers: this.auth.headers});
    return this.http.get(url, options)
      .map(res => res.json());

  }
  removeIngredientNow(page: number, index: number) {
    this.userIngredients[page].results.splice(index, 1);
  }


  fetchUserIngredients() {
    const options = new RequestOptions({headers: this.auth.headers});
    return this.http.get(Urls.ingredients, options)
      .map(res => res.json())
      .do((data) => this.userIngredients = [data]);
  }
  getUserIngredients() {
    return this.userIngredients.slice();
  }

}
