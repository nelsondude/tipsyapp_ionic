import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AlertController, Content, LoadingController, NavController, NavParams, PopoverController,
  Refresher
} from 'ionic-angular';
import {DrinksProvider} from '../../providers/drinks/drinks';
import {DrinkPage} from '../drink/drink';
import {PopoverPage} from '../popover/popover';
import {AuthProvider} from '../../providers/auth/auth';
import {PlaylistsProvider} from '../../providers/playlists/playlists';
import {HeaderScroller} from '../../directives/header-scroller';

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
    {name: 'Items You Need', option: 'count_need'},
    {name: 'Percent You Have', option: 'percent'}
  ];
  query = '';
  index = 0;
  filters = [];
  @ViewChild(Content) content: Content;

  loading = this.loadingCtrl.create({
    content: 'Loading Drinks ...'
  });

  constructor(public navCtrl: NavController,
              public drinksProvider: DrinksProvider,
              public plProvider: PlaylistsProvider,
              public loadingCtrl: LoadingController,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              public auth: AuthProvider) {}

  ngOnInit() {
    this.updateDrinksWithLoading();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Here is an Error...',
      buttons: ['OK']
    });
    alert.present();
  }

  updateDrinksWithRefresher(refresher: any) {
    this.drinksProvider.fetchFirstPage(
      this.query, this.options[this.index].option)
      .subscribe(
        (data) => console.log('Got the Drinks!'),
        (error) => refresher.complete(),
        () => refresher.complete()
      );
  }

  updateDrinksWithLoading() {
    this.drinksProvider.fetchFirstPage(
      this.query, this.options[this.index].option)
      .subscribe(
        (data) => console.log('Got the Drinks!'),
        (error) => this.showAlert(),
      );
  }

  loadDrink(drink: any) {
    this.drinksProvider.fetchDetailDrink(drink.url)
      .subscribe(
        (drinkDetail) => {
          this.navCtrl.push(DrinkPage, {drink: drinkDetail})
        }
      );
  }

  onShowPopover(event: any) {
    let popover = this.popoverCtrl.create(PopoverPage, {index: this.index, options: this.options});
    popover.present({ev: event});
    popover.onDidDismiss(data => {
      if (data) {
        this.index = data.index;
        this.plProvider.setSelectedPlaylists(data.filters);
      }
      this.updateDrinksWithLoading();
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
