var React = require('react');


var LoginForm = React.createClass({
  handleSumbit: function(e){
    e.preventDefault();

    // login user
    this.props.router.user.set('username')
    this.props.router.user.save()
    this.props.router.navigate('dashboard', {trigger: true});
  },
  render: function(){
    return <form onSubmit={this.handleSumbit}></form>;
  }

});

module.exports = LoginForm;
