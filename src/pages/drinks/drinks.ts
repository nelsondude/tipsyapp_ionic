import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {DrinkList} from '../../models/drinklist';
import {DrinksProvider} from '../../providers/drinks/drinks';
import {DrinkPage} from '../drink/drink';

/**
 * Generated class for the DrinksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-drinks',
  templateUrl: 'drinks.html',
})
export class DrinksPage implements OnInit {
  drinks: any = [];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public drinksProvider: DrinksProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrinksPage');
  }
  ngOnInit() {
    this.drinksProvider.getDrinks()
      .subscribe(
        (data) => {
          this.drinks = data.results
        },
        (error) => console.log(error),
        () => console.log('Request Completed')
      );
  }
  loadDrink(drink: any) {
    const loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    loading.present();
    this.drinksProvider.getDetailDrink(drink.url)
      .subscribe(
        (drinkDetail) => {
          this.navCtrl.push(DrinkPage, {drink: drinkDetail})
        },
        (error) => console.log(error),
        () => loading.dismiss()
      );
  }
}
