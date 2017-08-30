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
  options = [
    {name: 'Most Recent', option: 'timestamp'},
    {name: 'Items You Have', option: 'count_have'},
    {name: 'Items You Need', option: 'count_need'}
  ];
  query = '';
  index = 0;
  filters = [];

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
    const loading = this.loadingCtrl.create({
      content: 'Loading Drinks ...'
    });
    loading.present();
    this.drinksProvider.fetchFirstPage(this.query, this.options[this.index].option)
      .subscribe(
        (data) => console.log('Got the Drinks!'),
        (error) => console.log(error),
        () => loading.dismiss()
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
  onShowPopover(event: any) {
    let popover = this.popoverCtrl.create(PopoverPage, {index: this.index, options: this.options});
    popover.present({ev: event});
    popover.onDidDismiss(data => {
      if (data) {
        this.index = data.index;
        this.drinksProvider.setSelectedPlaylists(data.filters);
      }
      this.updateDrinks();
    });
  }

  doInfinite(infiniteScroll) {
    console.log(infiniteScroll);
    this.drinksProvider.fetchMorePages()
      .subscribe(
        (data) => console.log('Got the Drinks!'),
        (error) => console.log(error),
        () => infiniteScroll.complete()
      );
  }
  getListOfPages() {
    return this.drinksProvider.getPages();
  }

}
