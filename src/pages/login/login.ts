import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {SessionAuthProvider} from '../../providers/auth/session-auth';
import {AuthProvider} from '../../providers/auth/auth'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public sessionAuth: SessionAuthProvider,
              public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in ...',
    });
    loading.present();
    const username = form.value.username;
    const password = form.value.password;
    console.log(username, password);
    this.sessionAuth.login(username, password)
      .subscribe(
        (data) => localStorage.setItem('id_token', data.token),
        (error) => console.log(error),
        () => loading.dismiss()
      );
  }

}
