var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var Login = require('./Login.react');
var Signup = require('./Signup.react');
var TaskViewer = require('./TaskViewer.react');
var QuickAddProject = require('./QuickAddProject.react');
var QuickAddUser = require('./QuickAddUser.react');

var App = React.createClass({

    getInitialState: function() {
        return this._buildState();
    },

    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },

    render: function() {

        if (AppStore.getLoggedInUser() && AppStore.getSelectedOrg()) {
            var taskViewer;
            if (this.state.selectedTask) {
                taskViewer =
                    <TaskViewer
                        task={this.state.selectedTask} />
            }

            var addProjectBtn = <i className="fa fa-plus quick-add-btn" onClick={this._showAddProject}></i>;
            var quickAddProject;
            if (this.state.quickAddProject) {
                    quickAddProject = <QuickAddProject />;
                    addProjectBtn = <i className="fa fa-minus quick-add-btn" onClick={this._hideAddProject}></i>
            }

            var addUserBtn = <i className="fa fa-plus quick-add-btn" onClick={this._showAddUser}></i>;
            var quickAddUser;
            if (this.state.quickAddUser) {
                    quickAddUser = <QuickAddUser />;
                    addUserBtn = <i className="fa fa-minus quick-add-btn" onClick={this._hideAddUser}></i>
            }

            var projects = [];
            if (this.state.projects) {
                this.state.projects.each(function(project) {
                    projects.push(<li><a href={"/#/project/" + project.id}>{project.get("name")}</a></li>)
                });
            }

            var users = [];
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
                                    Dashboard
                                </li>
                                <li><a href="#">My tasks</a></li>
                                <li><a href="#/logout">Logout</a></li>

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
            return <div>
                <h1>Login</h1>
                <Login />
                <br />
                <br />
                <h1>Sign up</h1>
                <Signup />
            </div>
        }
    },

    _buildState: function() {
        var state = {
            selectedTask: AppStore.getSelectedTask(),
            projects: AppStore.getProjectsInOrg(),
            users: AppStore.getUsersInOrg(),
            selectedUser: AppStore.getSelectedUser(),
            selectedProject: AppStore.getSelectedProject(),
            quickAddProject: AppStore.getQuickAddProject(),
            quickAddUser: AppStore.getQuickAddUser()
        };
        if (state.selectedTask) {
            state.selectedTaskCid = state.selectedTask.cid;
        }
        if (state.selectedUser) {
            state.selectedUserCid = state.selectedUser.cid;
        }
        if (state.selectedProject) {
            state.selectedProjectCid = state.selectedProject.cid;
        }
        return state;
    },

    _onChange: function() {
        this.setState(this._buildState());
    },

    _showAddProject: function() {
        AppActions.showAddProject();
    },

    _hideAddProject: function() {
        AppActions.hideAddProject();
    },

    _showAddUser: function() {
        AppActions.showAddUser();
    },

    _hideAddUser: function() {
        AppActions.hideAddUser();
    }

});

module.exports = App;
