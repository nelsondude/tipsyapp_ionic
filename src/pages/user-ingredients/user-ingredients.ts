import {Component} from '@angular/core';
import {IngredientsProvider} from '../../providers/ingredients/ingredients';
import {DrinksProvider} from '../../providers/drinks/drinks';

/**
 * Generated class for the UserIngredientsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-ingredients',
  templateUrl: 'user-ingredients.html',
})
export class UserIngredientsPage {

  constructor(public drinksProvider: DrinksProvider,
              public ingredientsProvider: IngredientsProvider) {
  }

  ionViewWillEnter() {
    this.ingredientsProvider.fetchUserIngredients()
      .subscribe(
        (data) => console.log('success'),
        (error) => console.log(error),
        () => console.log('request complete')
      );

    this.ingredientsProvider.fetchSuggestedIngredients()
      .subscribe(
        (data) => console.log('suggested', data),
        (error) => console.log(error),
        () => console.log('request complete')
      );
  }

  getSuggestedIngredients() {
    return this.ingredientsProvider.getSuggestedIngredients();
  }

  //Below FUnctions Identical for clarity
  addIngredient(ingredient: any) {
    this.ingredientsProvider.addOrRemoveIngredient(ingredient.url)
      .subscribe(
        (data) => console.log(data),
        (error) => console.log(error),
        () => this.ingredientsProvider.fetchSuggestedIngredients()
      );
  }

  removeIngredient(ingredient: any, pageIndex: number, index: number) {
    this.ingredientsProvider.removeIngredientNow(pageIndex, index);
    this.ingredientsProvider.addOrRemoveIngredient(ingredient.url)
      .subscribe(
        (data) => console.log(data),
        (error) => console.log(error),
        () => this.ingredientsProvider.fetchSuggestedIngredients()
    );
  }

  getUserIngredients() {
    return this.ingredientsProvider.getUserIngredients();
  }

}
