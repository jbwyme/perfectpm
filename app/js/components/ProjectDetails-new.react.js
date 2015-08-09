var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskList = require('./TaskList.react');
var ProjectStore = require('../stores/ProjectStore');

function getState(projectId) {
  return {
    project: ProjectStore.getProject(projectId)
  };
}

var ProjectDetails = React.createClass({

  getInitialState: function() {
    return getState(this.props.id);
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
      <h1>Projects</h1>
      <TaskList tasks={this.state.project.get('tasks')} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getState(this.props.id));
  }
});

module.exports = ProjectDetails;
