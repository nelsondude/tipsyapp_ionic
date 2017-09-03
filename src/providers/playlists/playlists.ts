import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Urls } from '../../globals/urls'
import 'rxjs/add/operator/map';

/*
  Generated class for the PlaylistsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PlaylistsProvider {
  private playlists: any = [];
  private filters: any = [];

  constructor(public http: Http) {}

  fetchPlaylists() {
    return this.http.get(Urls.drinks + 'playlists/')
      .map(res => res.json())
      .do((data) => {
        this.playlists = data.results;
      });
  }

  getPlaylists() {
    return this.playlists.slice();
  }
  getFilters() {
    return this.filters.slice();
  }

  setSelectedPlaylists(playlists: string[]){
    this.filters = playlists.slice();
  }
  getSelectedPlaylists(){
    return this.filters.slice();
  }

}
