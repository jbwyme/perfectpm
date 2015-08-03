var React = require('react');
var ReactPropTypes = React.PropTypes;

var UserActions = require('../actions/UserActions');

var QuickAddUser = React.createClass({

  render: function() {
    return (
      <div className="quick-add-modal">
        <input type="text" ref="firstName" placeholder="first name" autoFocus="true" />
        <input type="text" ref="lastName" placeholder="last name" />
        <input type="text" ref="email" placeholder="email" onKeyPress={this._onKeyPress} />
        <button onClick={this._onClick}>Add user</button>
      </div>
    );
  },

  _onClick: function(e) {
    this._save();
  },

   _onKeyPress: function(e) {
    if (e.which === 13) {
      this._save();
    }
  },

  _save: function() {
      UserActions.save(null, this.refs.firstName.getDOMNode().value, this.refs.lastName.getDOMNode().value, this.refs.email.getDOMNode().value);
      UserActions.quickAddClose();
  }

});

module.exports = QuickAddUser;
