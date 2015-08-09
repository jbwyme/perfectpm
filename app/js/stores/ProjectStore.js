var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var ProjectsCollection = require('../models/ProjectsCollection');
var ProjectModel = require('../models/ProjectModel');
var ProjectConstants = require('../constants/ProjectConstants');

var _projects = new ProjectsCollection();
_projects.fetch().done(function() {
  ProjectStore.emitChange();
});

var _quickAddOpen = false;

var ProjectStore = assign({}, EventEmitter.prototype, {

  getProjects: function() {
    return _projects;
  },

  getProject: function(id) {
    var project = new ProjectModel({id: id});
    project.fetch().done(_.bind(function() {
      this.emitChange();
    }, this));
    return project;
  },

  quickAddOpen: function() { 
    return _quickAddOpen;
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

    case ProjectConstants.PROJECT_SAVE:

      var project = new ProjectModel(action);
      project.set('createdByUserId', 1);
      project.set('description', project.get('name'));
      project.set('orgId', 1);

      project.save();
      _projects.fetch();
      ProjectStore.emitChange();
      break;

    case ProjectConstants.PROJECT_QUICK_ADD_OPEN:
      _quickAddOpen = true;
      ProjectStore.emitChange();
      break;

    case ProjectConstants.PROJECT_QUICK_ADD_CLOSE:
      _quickAddOpen = false;
      ProjectStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ProjectStore;
