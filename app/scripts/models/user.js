var Backbone = require('backbone');

var User = Backbone.Model.extend({
  idAttribute: 'objectId',

  urlRoot: function() {
    if(localStorage.getItem('parse-session-token')) {
      return "https://tiny-parse-server.herokuapp.com/users/me/";
    } else {
      return "https://tiny-parse-server.herokuapp.com/users/";
    }
  }
});

var Session = Backbone.Model.extend({
  idAttribute: 'objectId',

  urlRoot: function() {
    if(localStorage.getItem('parse-session-token')) {
      return "https://tiny-parse-server.herokuapp.com/sessions/me/";
    } else {
      return "https://tiny-parse-server.herokuapp.com/users/";
    }
  },
  authenticate(options) {
    var self = this;

    if(options.username) {
      jQuery.ajax({
        url: "https://tiny-parse-server.herokuapp.com/login",
        data: {
          username: options.username,
          password: options.password
        }
      }).then(function(response){
        self.set('currentUser', new User(response));

        jQuery.ajaxSetup({
          beforeSend: function(xhr){
            xhr.setRequestHeader("X-Parse-Application-Id", "tiygvl");
            xhr.setRequestHeader("X-Parse-REST-API-Key", "slumber");
            xhr.setRequestHeader("X-Parse-Session-Token", response.sessionToken);
          }
        });

        localStorage.setItem('parse-session-token', response.sessionToken);
        self.trigger('authenticationSucceeded');
      });
    } else {
      // I'm authenticating with a sessionToken
      var user = new User(options);
      this.set('currentUser', user);
      this.trigger('authenticationSucceeded');
      user.fetch();
    }
  },

  restore() {
    var token = localStorage.getItem('parse-session-token');
    if(token) {
      this.authenticate({sessionToken: token});
    }
  },

  invalidate() {
    localStorage.removeItem('parse-session-token');
    this.trigger('invalidationSucceeded');
    window.location.reload();
  },

  isAuthenticated() {
    return !!this.get('currentUser');
  }
});

module.exports = {
  Session: Session,
  User: User
};
