var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskList = require('./TaskList.react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

function getTaskState() {
  var project = AppStore.getSelectedProject();
  var tasks = null;
  if (project) {
      tasks = project.get('tasks');
  }
  return {
    tasks: tasks
  };
}

var ProjectDetails = React.createClass({

  getInitialState: function() {
    return getTaskState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    AppActions.showProject(this.props.id);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var tasks = "loading..."
    if (this.state.tasks) {
      tasks = <TaskList tasks={this.state.tasks} />
    }

    return (
      <div>
      <h1>Tasks for project</h1>
      {tasks}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTaskState());
  }
});

module.exports = ProjectDetails;
