var Backbone = require('backbone');

var Recipe = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://tiny-parse-server.herokuapp.com/classes/DansRecipes/',
  url: function(){
    return this.urlRoot + this.get('objectId') + '/';
  }
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
  RecipeCollection: RecipeCollection
};
