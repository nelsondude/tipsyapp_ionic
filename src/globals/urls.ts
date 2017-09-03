export namespace Urls {
  let prefix = 'http://127.0.0.1:8000/';
  prefix = 'https://tipsyapp1.herokuapp.com/';
  // export var drinksLocal: string = 'http://tipsyapp1.herokuapp.com/api/drink/';
  export var drinks: string = prefix + 'api/drink/';
  export var login: string = prefix + 'api/accounts/login/token/';
  export var ingredients: string = prefix + 'api/ingredients/';
}
