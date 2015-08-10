var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskList = require('./TaskList.react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

function getTaskState() {
  return {
  };
}

var MyTasks = React.createClass({

  getInitialState: function() {
    return getTaskState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    AppActions.showUser(AppStore.getLoggedInUser().id, AppStore.getSelectedOrg().id);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
      <h1>My tasks</h1>
      <TaskList />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTaskState());
  }
});

module.exports = MyTasks;
