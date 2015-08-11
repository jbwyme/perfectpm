var React = require('react');
var ReactPropTypes = React.PropTypes;
var AppActions = require('../actions/AppActions');

var Login = React.createClass({
    getInitialState: function() {
        return {email: ''}
    },

    render: function() {
        return (
            <div className="login-wrapper">
                E-mail: <input type="text" placeholder="email" autoFocus="true" value={this.state.email} onChange={this._onChange} onKeyPress={this._onKeyPress} />
                <button onClick={this._onLoginClick}>Login</button>
            </div>
        );
    },

    _onKeyPress: function(e) {
        if (e.which === 13) {
            this._login();
        }
    },

    _onChange: function(e) {
        this.setState({email: e.target.value});
    },

    _onLoginClick: function(e) {
        this._login();
    },

    _login: function() {
        AppActions.login(this.state.email);
    }

});

module.exports = Login;
