import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {DrinkList} from '../../models/drinklist';
import {DrinksProvider} from '../../providers/drinks/drinks';
import {DrinkPage} from '../drink/drink';
import {PopoverPage} from '../popover/popover';
import {AuthProvider} from '../../providers/auth/auth';

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
  queryParam = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public drinksProvider: DrinksProvider,
              public loadingCtrl: LoadingController,
              public popoverCtrl: PopoverController,
              public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrinksPage');
  }
  ngOnInit() {
    this.updateDrinks();
  }

  updateDrinks() {
    this.drinksProvider.getFirstPage()
      .subscribe(
        (data) => console.log('Got the Drinks!'),
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
        (drinkDetail) => this.navCtrl.push(DrinkPage, {drink: drinkDetail}),
        (error) => console.log(error),
        () => loading.dismiss()
      );
  }
  onShowPopover(event: any) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ev: event});
  }
  doInfinite(infiniteScroll) {
    console.log(infiniteScroll);
    this.drinksProvider.addMorePages()
      .subscribe(
        (data) => console.log('Got the Drinks!'),
        (error) => console.log(error),
        () => infiniteScroll.complete()
      );
  }
  getListOfPages() {
    return this.drinksProvider.getPagesCopy();
  }

}
