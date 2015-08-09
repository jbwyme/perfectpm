var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskList = require('./TaskList.react');
var AppStore = require('../stores/AppStore');

function getTaskState(projectId) {
  return {
    tasks: AppStore.getProjects().get(projectId).get('tasks');
  };
}

var ProjectDetails = React.createClass({

  getInitialState: function() {
    return getTaskState(this.props.id);
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
	return (
    <div>
      <h1>Projects</h1>
      <TaskList tasks={this.state.tasks} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTaskState(this.props.id));
  }
});

module.exports = ProjectDetails;
