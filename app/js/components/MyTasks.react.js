var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskList = require('./TaskList.react');
var TaskStore = require('../stores/TaskStore');

function getTaskState() {
  return {
    tasks: TaskStore.tasksForMe()
  };
}


var MyTasks = React.createClass({

  getInitialState: function() {
    return getTaskState();
  },

  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this._onChange);
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
