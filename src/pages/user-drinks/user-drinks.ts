import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {DrinksProvider} from '../../providers/drinks/drinks';
import {DrinkPage} from '../drink/drink';
import {IngredientsProvider} from '../../providers/ingredients/ingredients';

/**
 * Generated class for the UserDrinksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-drinks',
  templateUrl: 'user-drinks.html',
})
export class UserDrinksPage {

  constructor(public navCtrl: NavController,
              public ingredientsProvider: IngredientsProvider,
              public drinksProvider: DrinksProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDrinksPage');
  }
  ionViewWillEnter() {
    this.drinksProvider.fetchUserDrinks()
      .subscribe(
        (data) => console.log('success'),
        (error) => console.log(error),
        () => console.log('request complete')
      );
  }

  getUserDrinks() {
    return this.drinksProvider.getUserDrinks();
  }
  doRefresh(refresher) {
    setTimeout(()=>{
      console.log('Finished Async Process');
      refresher.complete();
    }, 2000)
  }
  removeItem(drink: any, page: number, index: number) {
    this.drinksProvider.removeDrinkNow(page, index);
    this.drinksProvider.fetchDetailDrink(drink.url, true)
      .subscribe(
        (data) => console.log('removed!')
      );
  }

  loadDrink(drink: any) {
    const loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    loading.present();
    this.drinksProvider.fetchDetailDrink(drink.url)
      .subscribe(
        (drinkDetail) => this.navCtrl.push(DrinkPage, {drink: drinkDetail}),
        (error) => console.log(error),
        () => loading.dismiss()
      );
  }
}
