var React = require('react');
var TaskList = require('./TaskList.react');
var TaskStore = require('../stores/TaskStore');
var TaskViewer = require('./TaskViewer.react');

var App = React.createClass({

  getInitialState: function() {
    return {
      isViewingTask: false
    };
  },

  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this._onChange);
  },


  render: function() {
    var taskViewer;
    if (this.state.isViewingTask) {
      taskViewer =
        <TaskViewer
          task={TaskStore.viewingTask()} />
    }

  	return (
      <div>
        
          <div className="header">PerfectPM - Project Management</div>
          <div className="middle">
            <div className="nav">
              <ul>
                <li className="section">Dashboard</li>
                <li><a href="#">My tasks</a></li>
                <li className="section">Projects</li>
                <li><a href="/#/project/1">Project 1</a></li>
                <li><a href="/#/project/2">Project 2</a></li>
                <li><a href="/#/project/3">Project 3</a></li>
                <li><a href="/#/project/4">Project 4</a></li>

                <li className="section">Teams</li>
                <li><a href="/#/team/1">Team 1</a></li>
                <li><a href="/#/team/2">Team 2</a></li>
                <li><a href="/#/team/3">Team 3</a></li>
                <li><a href="/#/team/4">Team 4</a></li>

                <li className="section">Users</li>
                <li><a href="/#/user/1">User 1</a></li>
                <li><a href="/#/user/2">User 2</a></li>
                <li><a href="/#/user/3">User 3</a></li>
                <li><a href="/#/user/4">User 4</a></li>
              </ul>
            </div>

            <div className="body">
              {this.props.body}
              {taskViewer}
            </div>
          </div>

          <div className="footer">&copy; 2015 PerfectPM</div>

      </div>
  	);
  },

  _onChange: function() {
    this.setState({isViewingTask: !!TaskStore.viewingTask()});
  }

});

module.exports = App;
