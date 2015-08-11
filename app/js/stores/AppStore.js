var assign = require('object-assign');
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _selectedOrg,
    _loggedInUser,
    _projectsInOrg,
    _usersInOrg,
    _selectedProject,
    _selectedUser,
    _selectedTask,
    _taskList,
    _quickAddProject = false,
    _quickAddUser = false;

var AppStore = assign({}, EventEmitter.prototype, {

    getLoggedInUser: function() {
        return _loggedInUser;
    },

    getProjectsInOrg: function() {
        return _projectsInOrg;
    },

    getUsersInOrg: function() {
        return _usersInOrg;
    },

    getTasks: function() {
        return _tasks;
    },

    getSelectedOrg: function() {
        return _selectedOrg;
    },

    getSelectedTask: function() {
        return _selectedTask;
    },

    getSelectedProject: function() {
        return _selectedProject;
    },

    getSelectedUser: function() {
        return _selectedUser;
    },

    getTaskList: function() {
        return _taskList;
    },

    getQuickAddProject: function() {
        return _quickAddProject;
    },

    getQuickAddUser: function() {
        return _quickAddUser;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case AppConstants.LOGGED_IN:
            _loggedInUser = action.user;
            _selectedUser = _loggedInUser;
            _currentTaskCollection = _loggedInUser.get('tasks');
            AppStore.emitChange();
            break;
        case AppConstants.SHOW_ORG:
            _selectedOrg = action.org;
            _usersInOrg = action.users;
            _projectsInOrg = action.projects;
            AppStore.emitChange();
            break;
        case AppConstants.SHOW_PROJECT:
            _selectedUser = null;
            _selectedProject = action.project;
            _taskList = action.taskList;
            AppStore.emitChange();
            break;
        case AppConstants.SHOW_USER:
            _selectedUser = action.user;
            _selectedProject = null;
            _taskList = action.taskList;
            AppStore.emitChange();
            break;
        case AppConstants.VIEW_TASK:
            _selectedTask = action.task;
            AppStore.emitChange();
            break;
        case AppConstants.EXIT_TASK:
            _selectedTask = null;
            AppStore.emitChange();
            break;
        case AppConstants.ADD_TASK:
            _taskList.get('tasks').add(action.task);
            _selectedTask = action.task;
            AppStore.emitChange();
            break;
        case AppConstants.TASK_SAVED:
            AppStore.emitChange();
            break;
        case AppConstants.SHOW_ADD_PROJECT:
            _quickAddProject = true;
            AppStore.emitChange();
            break;
        case AppConstants.PROJECT_ADDED:
            _projectsInOrg.add(action.project);
            _quickAddProject = false;
            AppStore.emitChange();
            break;
        case AppConstants.HIDE_ADD_PROJECT:
            _quickAddProject = false;
            AppStore.emitChange();
            break;
        case AppConstants.SHOW_ADD_USER:
            _quickAddUser = true;
            AppStore.emitChange();
            break;
        case AppConstants.USER_ADDED:
            _usersInOrg.add(action.user);
            _quickAddUser = false;
            AppStore.emitChange();
            break;
        case AppConstants.HIDE_ADD_USER:
            _quickAddUser = true;
            AppStore.emitChange();
            break;
        default:
            // no op
    }
});

module.exports = AppStore;
