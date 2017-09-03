import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, Content, LoadingController, NavController, NavParams, PopoverController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
              public drinksProvider: DrinksProvider,
              public plProvider: PlaylistsProvider,
              public loadingCtrl: LoadingController,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              public auth: AuthProvider) {}

  ngOnInit() {
    this.updateDrinks();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Here is an Error...',
      buttons: ['OK']
    });
    alert.present();
  }

  updateDrinks() {
    const loading = this.loadingCtrl.create({
      content: 'Loading Drinks ...'
    });
    loading.present();
    this.drinksProvider.fetchFirstPage(this.query, this.options[this.index].option)
      .subscribe(
        (data) => console.log('Got the Drinks!'),
        (error) => {
          loading.dismiss();
          console.log(error);
          this.showAlert();
        },
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
        (error) => {
          console.log(error);
          loading.dismiss();
        },
        () => loading.dismiss()
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
