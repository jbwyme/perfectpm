var React = require('react');
var ReactPropTypes = React.PropTypes;

var QuickAddProject = React.createClass({

  render: function() {
    return (
      <div className="quick-add-modal">
        <input type="text" ref="name" placeholder="name" autoFocus="true" onKeyPress={this._onKeyPress} />
        <button onClick={this._onClick}>Add project</button>
      </div>
    );
  },

  _onKeyPress: function(e) {
    if (e.which === 13) {
      this._save();
    }
  },

  _onClick: function(e) {
      this._save();
  },

  _save: function() {
  }

});

module.exports = QuickAddProject;
