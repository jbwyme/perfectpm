var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var TaskViewer = require('./TaskViewer.react');
var QuickAddProject = require('./QuickAddProject.react');
var QuickAddTask = require('./QuickAddTask.react');
var QuickAddUser = require('./QuickAddUser.react');

var App = React.createClass({

  getInitialState: function() {
    return this._buildState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    AppActions.login(1);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    if (AppStore.getLoggedInUser()) {
      var taskViewer;
      if (this.state.selectedTask) {
        taskViewer =
          <TaskViewer
            task={this.state.selectedTask} />
      }

      var addProjectBtn = <i className="fa fa-plus quick-add-btn" onClick={this._showAddProject}></i>
      var quickAddProject;
      if (this.state.quickAddProject) {
          quickAddProject = <QuickAddProject />
          addProjectBtn = <i className="fa fa-minus quick-add-btn" onClick={this._hideAddProject}></i>
      }

      var addUserBtn = <i className="fa fa-plus quick-add-btn" onClick={this._showAddUser}></i>
      var quickAddUser;
      if (this.state.quickAddUser) {
          quickAddUser = <QuickAddUser />
          addUserBtn = <i className="fa fa-minus quick-add-btn" onClick={this._hideAddUser}></i>
      }

      var projects = []
      if (this.state.projects) {
        this.state.projects.each(function(project) {
          projects.push(<li><a href={"/#/project/" + project.id}>{project.get("name")}</a></li>)
        });
      }

      var users = []
      if (this.state.users) {
        this.state.users.each(function(user) {
          users.push(<li><a href={"/#/user/" + user.id}>{user.getName()}</a></li>)
        });
      }


    	return (
        <div>
          
            <div className="header">PerfectPM - Project Management</div>
            <div className="middle">
              <div className="nav">
                <ul>
                <li className="section users-section">
                    Tasks
                  </li>
                  <li><a href="#">My tasks</a></li>

                  <li className="section users-section">
                    Projects {addProjectBtn}
                    {quickAddProject}
                  </li>
                  {projects}

                  <li className="section users-section">
                    Users {addUserBtn}
                    {quickAddUser}
                  </li>
                  {users}
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
    } else {
      return <div>logging in...</div>;
    }
  },

  _buildState: function() {
    var state = {
      selectedTask: AppStore.getSelectedTask(), 
      projects: AppStore.getProjectsInOrg(),
      users: AppStore.getUsersInOrg()
    }
    if (state.selectedTask) {
      state.selectedTaskCid = state.selectedTask.cid;
    }
    return state;
  },

  _onChange: function() {
    this.setState(this._buildState());
  },

});

module.exports = App;
