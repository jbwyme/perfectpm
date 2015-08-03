var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskList = require('./TaskList.react');
var TaskStore = require('../stores/TaskStore');

function getTaskState(userId) {
  return {
    tasks: TaskStore.forUser(userId)
  };
}

var UserOverview = React.createClass({

  getInitialState: function() {
    return getTaskState(this.props.id);
  },

  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this._onChange);
  },

  render: function() {
	return (
    <div>
      <h1>User overview</h1>
      <TaskList tasks={this.state.tasks} />
    </div>
    );
  },

  _onChange: function() {
    this.setState(getTaskState(this.props.id));
  }
});

module.exports = UserOverview;
