import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
export class PopoverPage {
  options = [
    {name: 'Most Recent', option: 'timestamp', checked: true},
    {name: 'Ingredients You Have', option: 'count_have', checked: false},
    {name: 'Ingredients You Need', option: 'count_need', checked: false}
  ];
  selectedOption = this.options[0].option;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }


}
