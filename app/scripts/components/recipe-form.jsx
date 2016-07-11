var React = require('react');

// var FormGroup = require('react-bootstrap/lib/FormGroup');
// var Label = require('react-bootstrap/lib/Label');
// var Input = require('react-bootstrap/lib/Input');

var models = require('../models/recipe');

var RecipeForm = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe()
    };
  },
  componentWillMount: function(){
    var self = this;

    if(this.props.editId){
      var recipe = this.state.recipe;
      console.log(recipe);
      recipe.set('id', this.props.editId);
      recipe.sync().done(function(){
        self.setState({recipe: recipe});
      });
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    var router = this.props.router;

    var recipeData = jQuery(e.target).serializeObject();
    var recipe = this.state.recipe;

    recipe.set(recipeData);
    recipe.save().done(function(){
      router.navigate('recipes/', {trigger: true});
    });
  },
  render: function(){
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Add Recipe</h1>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="title" className="form-control" id="title" name="title" placeholder="Recipe Title" />
            </div>

            <input type="submit" className="btn btn-primary" value="Add Recipe"/>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = RecipeForm;
