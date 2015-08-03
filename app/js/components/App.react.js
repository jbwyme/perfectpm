var ProjectActions = require('../actions/ProjectActions');
var ProjectStore = require('../stores/ProjectStore');
var React = require('react');
var TaskActions = require('../actions/TaskActions');
var TaskList = require('./TaskList.react');
var TaskStore = require('../stores/TaskStore');
var TaskViewer = require('./TaskViewer.react');
var QuickAddProject = require('./QuickAddProject.react');
var QuickAddTask = require('./QuickAddTask.react');
var QuickAddUser = require('./QuickAddUser.react');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var App = React.createClass({

  getInitialState: function() {
    return this._buildState();
  },

  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
    ProjectStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
    ProjectStore.removeChangeListener(this._onChange);
  },


  render: function() {
    var taskViewer;
    if (this.state.viewingTask) {
      taskViewer =
        <TaskViewer
          task={TaskStore.viewingTask()} />
    }

    var addTaskBtn = <i className="fa fa-plus quick-add-btn" onClick={this._showAddTask}></i>
    var quickAddTask;
    if (this.state.quickAddTask) {
        quickAddTask = <QuickAddTask />
        addTaskBtn = <i className="fa fa-minus quick-add-btn" onClick={this._hideAddTask}></i>
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
    this.state.projects.each(function(project) {
      projects.push(<li><a href={"/#/project/" + project.id}>{project.get("name")}</a></li>)
    });

    var users = []
    this.state.users.each(function(user) {
      users.push(<li><a href={"/#/user/" + user.id}>{user.getName()}</a></li>)
    });


  	return (
      <div>
        
          <div className="header">PerfectPM - Project Management</div>
          <div className="middle">
            <div className="nav">
              <ul>
              <li className="section users-section">
                  Tasks {addTaskBtn}
                  {quickAddTask}
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
  },

  _buildState: function() {
    return {
      viewingTask: TaskStore.viewingTask(), 
      quickAddTask: TaskStore.quickAddOpen(), 
      quickAddProject: ProjectStore.quickAddOpen(), 
      quickAddUser: UserStore.quickAddOpen(),
      projects: ProjectStore.getProjects(),
      users: UserStore.getUsers()
    }
  },

  _onChange: function() {
    this.setState(this._buildState());
  },

  _showAddTask: function() {
    TaskActions.quickAddOpen();
  },

  _hideAddTask: function() {
    TaskActions.quickAddClose();
  },

  _showAddProject: function() {
    ProjectActions.quickAddOpen();
  },

  _hideAddProject: function() {
    ProjectActions.quickAddClose();
  },

  _showAddUser: function() {
    UserActions.quickAddOpen();
  },

  _hideAddUser: function() {
    UserActions.quickAddClose();
  }

});

module.exports = App;
