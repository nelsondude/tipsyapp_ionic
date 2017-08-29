import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { DrinksProvider } from '../providers/drinks/drinks';
import {DrinksPage} from '../pages/drinks/drinks';
import {DrinkPage} from "../pages/drink/drink";
import {HttpModule} from '@angular/http';
import {SafePipe} from '../pipes/safe.pipe';
import {PopoverPage} from '../pages/popover/popover';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    DrinksPage,
    DrinkPage,
    PopoverPage,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DrinksPage,
    DrinkPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DrinksProvider,
    AuthProvider
  ]
})
export class AppModule {}
