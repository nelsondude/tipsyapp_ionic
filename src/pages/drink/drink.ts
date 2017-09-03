import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {DrinksProvider} from '../../providers/drinks/drinks';

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
              public toastCtrl: ToastController,
              public drinkProvider: DrinksProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrinkPage');
  }

  ngOnInit() {
    this.drink = this.navParams.get('drink');
  }
  onSaveDrink(msg: string, showToast=true){
    const toast = this.toastCtrl.create({
      message: msg + 'Drink Successfully!',
      duration: 1500
    });
    toast.present();
    this.drinkProvider.fetchDetailDrink(this.drink.url, true)
      .subscribe(
        (data) => this.drink.have_it = !this.drink.have_it,
        (error) => console.log(error),
        () => console.log('finished OnSaveDrink funciton')
      );
  }

  onShowDescription() {
    this.description = !this.description;
    console.log(this.drink);
  }
}
