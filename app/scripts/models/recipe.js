var Backbone = require('backbone');

var Ingredient = Backbone.Model.extend({

});

var IngredientCollection = Backbone.Collection.extend({
  model: Ingredient
});

var Recipe = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://tiny-parse-server.herokuapp.com/classes/DansRecipes/'
});

var RecipeCollection = Backbone.Collection.extend({
  model: Recipe,
  url: 'https://tiny-parse-server.herokuapp.com/classes/DansRecipes/',
  parse: function(serverResponse){
    return serverResponse.results;
  }
});

module.exports = {
  Recipe: Recipe,
  RecipeCollection: RecipeCollection,
  IngredientCollection: IngredientCollection
};
