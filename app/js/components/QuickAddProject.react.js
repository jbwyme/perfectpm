var React = require('react');
var ReactPropTypes = React.PropTypes;
var AppActions = require('../actions/AppActions');

var QuickAddProject = React.createClass({
    getInitialState: function() {
        return {name: ''}
    },

    render: function() {
        return (
            <div className="quick-add-modal">
                <input type="text" ref="name" placeholder="name" autoFocus="true" value={this.state.name} onChange={this._onChange} onKeyPress={this._onKeyPress} />
                <button onClick={this._onAddClick}>Add project</button>
            </div>
        );
    },

    _onKeyPress: function(e) {
        if (e.which === 13) {
            this._save();
        }
    },

    _onChange: function(e) {
        this.setState({name: e.target.value});
    },

    _onAddClick: function(e) {
        this._save();
    },

    _save: function() {
        AppActions.addProject(this.state.name);
    }

});

module.exports = QuickAddProject;
