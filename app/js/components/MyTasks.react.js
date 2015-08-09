var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskList = require('./TaskList.react');
var AppStore = require('../stores/AppStore');

function getTaskState() {
  return {
    tasks: AppStore.getLoggedInUser().get('tasks')
  };
}


var MyTasks = React.createClass({

  getInitialState: function() {
    return getTaskState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <TaskList tasks={this.state.tasks} />
    );
  },

  _onChange: function() {
    this.setState(getTaskState());
  }
});

module.exports = MyTasks;
