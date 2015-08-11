var React = require('react');
var ReactPropTypes = React.PropTypes;
var AppActions = require('../actions/AppActions');

var QuickAddUser = React.createClass({

    getInitialState: function() {
        return {
            firstName: '',
            lastName: '',
            email: ''
        }
    },

    render: function() {
        return (
            <div className="quick-add-modal">
                <input type="text" ref="firstName" placeholder="first name" autoFocus="true" onChange={this._firstNameChanged} />
                <input type="text" ref="lastName" placeholder="last name" onChange={this._lastNameChanged} />
                <input type="text" ref="email" placeholder="email" onKeyPress={this._onKeyPress} onChange={this._emailChanged} />
                <button onClick={this._onAddClick}>Add user</button>
            </div>
        );
    },

    _firstNameChanged: function(e) {
        this.setState({firstName: e.target.value});
    },

    _lastNameChanged: function(e) {
        this.setState({lastName: e.target.value});
    },

    _emailChanged: function(e) {
        this.setState({email: e.target.value});
    },

    _onAddClick: function(e) {
        this._save();
    },

     _onKeyPress: function(e) {
        if (e.which === 13) {
            this._save();
        }
    },

    _save: function() {
        AppActions.addUser(this.state.firstName, this.state.lastName, this.state.email);
    }

});

module.exports = QuickAddUser;
