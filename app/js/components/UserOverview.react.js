var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskList = require('./TaskList.react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

function getTaskState(userId) {
  var user = AppStore.getSelectedUser();
  var tasks = null;
  if (user) {
      tasks = user.get('tasks');
  }
  return {
    tasks: tasks
  };
}

var UserOverview = React.createClass({

  getInitialState: function() {
    return getTaskState(this.props.id);
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    AppActions.showUser(this.props.id);
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
      <h1>User tasks</h1>
      {tasks}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTaskState(this.props.id));
  }
});

module.exports = UserOverview;
