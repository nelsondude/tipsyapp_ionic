import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DrinkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-drink',
  templateUrl: 'drink.html',
})
export class DrinkPage implements OnInit {
  drink: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrinkPage');
  }

  ngOnInit() {
    this.drink = this.navParams.get('drink');
  }
  onSaveDrink(){

  }
  onShowDescription() {

  }

}
