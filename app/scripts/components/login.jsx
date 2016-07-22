var React = require('react');

var Session = require('../models/user').Session;

var LoginForm = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      password: ''
    };
  },
  handleSumbit: function(e){
    e.preventDefault();
    var self = this;

    var session = new Session();
    session.authenticate({
      username: this.state.username,
      password: this.state.password
    });

    session.on('authenticationSucceeded', function(){
      self.props.router.navigate('recipes/', {trigger: true});
    });

    // // login user
    // this.props.router.user.set('username')
    // this.props.router.user.save()
    // this.props.router.navigate('dashboard', {trigger: true});
  },
  handlePasswordChange: function(e){
    this.setState({password: e.target.value});
  },
  handleUsernameChange: function(e){
    this.setState({username: e.target.value});
  },
  render: function(){
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSumbit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input onChange={this.handleUsernameChange} type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input onChange={this.handlePasswordChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>

          <input type="submit" value="Login" className="btn btn-primary"/>
        </form>
      </div>
    );
  }

});

module.exports = LoginForm;
