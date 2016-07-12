var React = require('react');

var models = require('../models/recipe');

var IngredientForm = React.createClass({
  handleAmount: function(e){
    this.props.ingredient.set('amount', e.target.value);
  },
  handleUnits: function(e){
    this.props.ingredient.set('units', e.target.value);
  },
  handleName: function(e){
    this.props.ingredient.set('name', e.target.value);
  },
  render: function(){
    var ingredient = this.props.ingredient;
    var count = this.props.counter + 1;
    return (
      <div>
        <h4>Ingredient #{count}</h4>
        <input onChange={this.handleAmount} value={ingredient.get('amount')} type="text" name="amount" placeholder="Qty" className="form-control col-md-2"/>
        <input onChange={this.handleUnits} type="text" name="units" placeholder="Units" className="form-control col-md-2"/>
        <input onChange={this.handleName}  type="text" name="name" placeholder="Ingredient" className="form-control col-md-6"/>
      </div>
    )
  }
})


var RecipeForm = React.createClass({
  getInitialState: function(){
    var ingredients = new models.IngredientCollection();
    ingredients.add([{}]);

    return {
      ingredients: ingredients,
      recipe: new models.Recipe()
    };
  },
  componentWillMount: function(){
    var self = this;
    var recipe = this.state.recipe;

    recipe.on('change', this.update);
    this.state.ingredients.on('add', this.update);

    if(this.props.editId){
      recipe.set('objectId', this.props.editId);
      recipe.fetch().done(function(){
        self.setState({
          ingredients: recipe.get('ingredients'),
          recipe: recipe,
          title: recipe.get('title')
        });
      });
    }
  },
  update: function(){
    this.forceUpdate();
  },
  handleSubmit: function(e){
    e.preventDefault();
    var router = this.props.router;

    //var recipeData = jQuery(e.target).serializeObject();
    var recipe = this.state.recipe;
    var ingredients = this.state.ingredients;

    recipe.set('ingredients', ingredients.toJSON());

    console.log(recipe);

    // recipe.set(recipeData);
    // recipe.set({title: this.state.title});
    recipe.save().done(function(){
      router.navigate('recipes/', {trigger: true});
    });
  },
  handleTitleChange: function(e){
    this.state.recipe.set('title', e.target.value);
    //this.setState({title: e.target.value});
  },
  handleDescChange: function(e){
    this.state.recipe.set('description', e.target.value);
  },
  addIngredient: function(){
    this.state.ingredients.add([{}]);
  },
  render: function(){

    var ingredientFormSet = this.state.ingredients.map(function(ingredient, index){
      return <IngredientForm key={ingredient.cid} ingredient={ingredient} counter={index}/>
    });

    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Add Recipe</h1>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input onChange={this.handleTitleChange} value={this.state.recipe.get('title')} type="title" className="form-control" id="title" name="title" placeholder="Recipe Title" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input onChange={this.handleDescChange} value={this.state.recipe.get('description')} type="title" className="form-control" id="description" name="description" placeholder="Recipe Description" />
            </div>

            <div className="form-group">
              <button type="button" className="btn btn-success" onClick={this.addIngredient}>Add Ingredient</button>
              {ingredientFormSet}
            </div>

            <input type="submit" className="btn btn-primary" value="Add Recipe"/>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = RecipeForm;
