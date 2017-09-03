import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { DrinksProvider } from '../providers/drinks/drinks';
import {DrinksPage} from '../pages/drinks/drinks';
import {DrinkPage} from "../pages/drink/drink";
import {HttpModule} from '@angular/http';
import {SafePipe} from '../pipes/safe.pipe';
import {PopoverPage} from '../pages/popover/popover';
import { AuthProvider } from '../providers/auth/auth';
import {TabsPage} from '../pages/tabs/tabs';
import { UserIngredientsPage} from '../pages/user-ingredients/user-ingredients';
import { UserDrinksPage } from '../pages/user-drinks/user-drinks';
import { PlaylistsProvider } from '../providers/playlists/playlists';
import {LoginPage} from '../pages/login/login';
import {SessionAuthProvider} from '../providers/auth/session-auth';
import { IngredientsProvider } from '../providers/ingredients/ingredients';
import {SettingsPage} from '../pages/settings/settings';
import {HeaderScroller} from '../directives/header-scroller';
import {TutorialPage} from '../pages/tutorial/tutorial';
import {IonShrinkingHeader} from '../directives/ion-shrinking-header';


@NgModule({
  declarations: [
    MyApp,
    DrinksPage,
    DrinkPage,
    PopoverPage,
    SafePipe,
    TabsPage,
    UserIngredientsPage,
    UserDrinksPage,
    LoginPage,
    SettingsPage,
    HeaderScroller,
    TutorialPage,
    IonShrinkingHeader

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DrinksPage,
    DrinkPage,
    PopoverPage,
    TabsPage,
    UserIngredientsPage,
    UserDrinksPage,
    LoginPage,
    SettingsPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DrinksProvider,
    AuthProvider,
    PlaylistsProvider,
    SessionAuthProvider,
    IngredientsProvider
  ]
})
export class AppModule {}
