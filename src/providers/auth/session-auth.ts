import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Urls} from '../../globals/urls'

@Injectable()
export class SessionAuthProvider {

  constructor(public http: Http) {}

  login(username: string, password: string) {
    let body = {
      username: username,
      password: password
    };
    return this.http.post(Urls.login, body)
      .map(res => res.json());
  }
}
