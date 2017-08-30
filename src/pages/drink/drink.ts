import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

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
  description = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrinkPage');
  }

  ngOnInit() {
    this.drink = this.navParams.get('drink');
  }
  onSaveDrink(){
    const toast = this.toastCtrl.create({
      message: 'Saved Drink Successfully!',
      duration: 2000
    });
    toast.present();
  }
  onShowDescription() {
    this.description = !this.description;
  }
}
