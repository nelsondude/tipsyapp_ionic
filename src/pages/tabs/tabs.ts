import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DrinksPage} from '../drinks/drinks';
import {UserDrinksPage} from '../user-drinks/user-drinks';
import {UserIngredientsPage} from '../user-ingredients/user-ingredients';
import {LoginPage} from '../login/login';
// import {AuthProvider} from '../../providers/auth/auth';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  drinksPage = DrinksPage;
  userDrinksPage = UserDrinksPage;
  userIngredientsPage = UserIngredientsPage;
  loginPage = LoginPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
