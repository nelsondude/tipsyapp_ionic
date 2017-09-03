import { Injectable } from '@angular/core';
import {Http, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Urls } from '../../globals/urls'
import {PlaylistsProvider} from '../playlists/playlists';
import { Storage } from '@ionic/storage';
import {AuthProvider} from '../auth/auth';

/*
  Generated class for the DrinksProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DrinksProvider {
  private pages: any = [];
  private userDrinks: any = [];

  constructor(public http: Http,
              public plProvider: PlaylistsProvider,
              public auth: AuthProvider) {}

  fetchFirstPage(query: string, ordering: string) {
    const params: URLSearchParams = new URLSearchParams();
    for (const filter of this.plProvider.getFilters()) params.append('filter', filter);
    params.append('ordering', ordering);
    params.append('q', query);
    const options = new RequestOptions(
      {headers: this.auth.headers, search: params}
    );
    return this.http.get(Urls.drinks, options)
      .map(res => res.json())
      .do((data) => this.pages = [data]);
  }

  fetchMorePages() {
    let url = '';
    if (this.hasMorePages()) {
      const lastPage = this.pages[this.pages.length - 1];
      url = lastPage.next;
    }
    console.log(url);
    return this.http.get(url)
      .map(res => res.json())
      .do((data) => this.pages.push(data));
  }
  getPages() {
    return this.pages.slice();
  }

  fetchDetailDrink(drinkUrl, changeUser = false) {
    const params: URLSearchParams = new URLSearchParams();
    if (changeUser) params.set('changeUser', 'true');
    console.log(this.auth.idToken);
    console.log(changeUser);

    const options = new RequestOptions(
      {headers: this.auth.headers,
        search: params}
    );
    return this.http.get(drinkUrl, options)
      .map(res => res.json());
  }
  hasMorePages() {
    const lastPage = this.pages[this.pages.length - 1];
    return lastPage && lastPage.next;
  }
  removeDrinkNow(page: number, index: number) {
    this.userDrinks[page].results.splice(index, 1);
  }

  fetchUserDrinks() {
    const params: URLSearchParams = new URLSearchParams();
    params.set('user', 'true');
    const options = new RequestOptions(
      {headers: this.auth.headers, search: params}
    );
    return this.http.get(Urls.drinks, options)
      .map(res => res.json())
      .do((data) => this.userDrinks = [data]);
  }

  getUserDrinks() {
    return this.userDrinks.slice();
  }

}
