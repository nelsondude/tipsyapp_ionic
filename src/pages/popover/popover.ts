import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DrinksProvider} from '../../providers/drinks/drinks';

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage implements OnInit{
  index: number;
  options: {name: string, option: string}[];
  filters = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public drinksProvider: DrinksProvider) {
  }

  ngOnInit() {
    this.filters = this.drinksProvider.getSelectedPlaylists();
  }

  ionViewWillEnter() {
    this.index = this.navParams.get('index');
    this.options = this.navParams.get('options');
    if (this.getPlaylists().length == 0){
      this.drinksProvider.fetchPlaylists()
        .subscribe(
          (data) => console.log(data),
          (error) => console.log(error),
          () => console.log('success')
        )
    }
  }
  ionViewWillLeave() {
    this.drinksProvider.setSelectedPlaylists(this.filters);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }
  showData(index: number) {
    this.index = index;
    this.viewCtrl.dismiss({index: index, filters: this.filters});
  }

  getPlaylists() {
    return this.drinksProvider.getPlaylists();
  }
}
