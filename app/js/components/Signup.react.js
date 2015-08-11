var React = require('react');
var ReactPropTypes = React.PropTypes;
var AppActions = require('../actions/AppActions');

var Signup = React.createClass({
    getInitialState: function() {
        return {
            orgName: '',
            firstName: '',
            lastName: '',
            email: ''
        }
    },

    render: function() {
        return (
            <div className="login-wrapper">
                <label htmlFor="company-input">Company name:</label> <input type="text" id="company-name-input" placeholder="company name" autoFocus="true" value={this.state.orgName} onChange={this._onOrgNameChange} /><br/>
                <label htmlFor="first-name-input">First name:</label> <input type="text" id="first-name-input" placeholder="first name" value={this.state.firstName} onChange={this._onFirstNameChange} /><br/>
                <label htmlFor="last-name-input">Last name:</label> <input type="text" id="last-name-input" placeholder="last name" value={this.state.lastName} onChange={this._onLastNameChange} /><br/>
                <label htmlFor="email-input">E-mail:</label> <input type="text" id="email-input" placeholder="email" value={this.state.email} onChange={this._onEmailChange} /><br/>
                <button onClick={this._onSignupClick}>Signup</button>
            </div>
        );
    },

    _onKeyPress: function(e) {
        if (e.which === 13) {
            this._login();
        }
    },

    _onOrgNameChange: function(e) {
        this.setState({orgName: e.target.value});
    },

    _onFirstNameChange: function(e) {
        this.setState({firstName: e.target.value});
    },

    _onLastNameChange: function(e) {
        this.setState({lastName: e.target.value});
    },

    _onEmailChange: function(e) {
        this.setState({email: e.target.value});
    },

    _onSignupClick: function(e) {
        this._register();
    },

    _register: function() {
        AppActions.register(this.state.orgName, this.state.firstName, this.state.lastName, this.state.email);
    }

});

module.exports = Signup;
