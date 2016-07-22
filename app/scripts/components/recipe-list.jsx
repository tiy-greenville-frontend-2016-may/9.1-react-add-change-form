var React = require('react');
var models = require('../models/recipe');

var Header = require('./header.jsx');

var RecipeList = React.createClass({
  getInitialState: function(){
    return {
      recipeCollection: []
    };
  },
  componentWillMount: function(){
    var self = this;
    var recipeCollection = new models.RecipeCollection();
    recipeCollection.fetch().done(function(){
      self.setState({recipeCollection: recipeCollection});
    });
  },
  render: function(){
    var recipes = this.state.recipeCollection;
    console.log(recipes);
    var recipeList = recipes.map(function(recipe){
      return (
        <li key={recipe.get('objectId')}>
          {recipe.get('title')}
          <a href={"#recipes/" + recipe.get('objectId') + "/edit/"}>Edit</a>
        </li>
      );
    });

    return (
      <div>
        <Header />

        <div className="row">
          <div className="col-md-12">
            <h1>
              Recipes!
              <a href="#recipes/add/" className="btn btn-primary pull-right">Add</a>
            </h1>

            <ul>
              {recipeList}
            </ul>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = RecipeList;
