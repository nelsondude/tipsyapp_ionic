import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import Auth0Cordova from '@auth0/cordova';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {AuthProvider} from '../providers/auth/auth';
import {SettingsPage} from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  loginPage:any = LoginPage;
  settingsPage:any = SettingsPage;

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public menuCtrl: MenuController,
              public auth: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

     // Auth0 functions
      (<any>window).handleOpenURL = (url) => {
        Auth0Cordova.onRedirectUri(url);
      };
    });
  }

  loadPage(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}

