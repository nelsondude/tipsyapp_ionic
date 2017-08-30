import { Injectable } from '@angular/core';
import {Http, RequestOptions, URLSearchParams, Headers} from '@angular/http';
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
  private playlists: any = [];
  private filters: any = [];

  url = 'http://127.0.0.1:8000/api/drink/';

  constructor(public http: Http) {
    console.log('Hello DrinksProvider Provider');
  }

  fetchFirstPage(query: string, ordering: string) {
    console.log('filters:', this.filters);
    const params: URLSearchParams = new URLSearchParams();
    for (const filter of this.filters) params.append('filter', filter);
    params.append('ordering', ordering);
    params.append('q', query);
    const headers = new Headers();
    const token = localStorage.getItem('id_token');
    if (token) {
      headers.set('Authorization', 'JWT ' + token);
    }

    const options = new RequestOptions(
      {headers: headers, search: params}
    );
    return this.http.get(this.url, options)
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
  fetchDetailDrink(drinkUrl) {
    return this.http.get(drinkUrl)
      .map(res => res.json());
  }
  hasMorePages() {
    const lastPage = this.pages[this.pages.length - 1];
    return lastPage && lastPage.next;
  }
  fetchPlaylists() {
    return this.http.get(this.url + 'playlists/')
      .map(res => res.json())
      .do((data) => {
        this.playlists = data.results;
        // this.playlists = [];
        // for (const playlist of data.results) {
        //   const dict = {'name': playlist.name, 'selected': false};
        //   this.playlists.push(dict);
        // }
        console.log(this.playlists);
      });
  }
  playlistsFetched() {
    return this.playlists.length > 0;
  }
  getPlaylists() {
    return this.playlists.slice();
  }
  togglePlaylistSelected(index: number) {
    if (index < this.playlists.length - 1) {
      this.playlists[index].selected = !this.playlists[index].selected;
    }
  }

  setSelectedPlaylists(playlists: string[]){
    this.filters = playlists.slice();
  }
  getSelectedPlaylists(){
    return this.filters.slice();
  }
}
