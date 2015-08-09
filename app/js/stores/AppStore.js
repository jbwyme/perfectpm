var assign = require('object-assign');
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _loggedInUser,
    _projectsInOrg,
    _usersInOrg,
    _selectedProject,
    _selectedUser,
    _selectedTask,
    _currentTaskCollection;

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

  getSelectedTask: function() { 
    return _selectedTask;
  },

  getSelectedProject: function() { 
    return _selectedProject;
  },

  getSelectedUser: function() { 
    return _selectedUser;
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
      AppStore.emitChange();
      break;
    case AppConstants.SHOW_ORG: 
      _usersInOrg = action.users;
      _projectsInOrg = action.projects;
      AppStore.emitChange();
      break;
    case AppConstants.SHOW_PROJECT: 
      _selectedUser = null;
      _selectedProject = action.project;
      _currentTaskCollection = _selectedProject.get('tasks');
      AppStore.emitChange();
      break;
    case AppConstants.SHOW_USER: 
      _selectedUser = action.user;
      _selectedProject = null;
      _currentTaskCollection = _selectedUser.get('tasks');
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
      _currentTaskCollection.add(action.task);
      AppStore.emitChange();
      break;
    case AppConstants.TASK_SAVED: 
      AppStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = AppStore;
