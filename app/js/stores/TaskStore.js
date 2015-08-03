var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var TasksCollection = require('../models/TasksCollection');
var TaskModel = require('../models/TaskModel');
var TaskConstants = require('../constants/TaskConstants');

var _tasks = new TasksCollection();
_tasks.fetch().done(function() {
  TaskStore.emitChange();
})

var _viewingTask;
var _quickAddOpen = false;

var TaskStore = assign({}, EventEmitter.prototype, {

  tasksForMe: function() {
    return this.tasksForUser(1);
  },

  tasksForUser: function(id) {
    return _tasks;
  },

  tasksForProject: function(id) {
    return new TasksCollection(_tasks.slice(0, 3));
  },

  viewingTask: function() {
    return _viewingTask;
  },

  quickAddOpen: function() { 
    return _quickAddOpen;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case TaskConstants.TASK_VIEW:
      _viewingTask = _tasks.get(action.id);
      TaskStore.emitChange();
      break;

    case TaskConstants.TASK_SAVE:
      (new TaskModel(action)).save();
      _tasks.fetch();
      TaskStore.emitChange();
      break;

    case TaskConstants.TASK_CANCEL:
      _viewingTask = null;
      TaskStore.emitChange();
      break;

    case TaskConstants.TASK_QUICK_ADD_OPEN:
      _quickAddOpen = true;
      TaskStore.emitChange();
      break;

    case TaskConstants.TASK_QUICK_ADD_CLOSE:
      _quickAddOpen = false;
      TaskStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TaskStore;
