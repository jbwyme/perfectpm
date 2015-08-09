var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskConstants = require('../constants/TaskConstants');

var TaskActions = {

  create: function(name, description, estimate) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_CREATE,
      name: name,
      description: description,
      estimate: estimate
    });
  },

  delete: function(id) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_DELETE,
      id: id
    });
  },

  view: function(id) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_VIEW,
      id: id
    })
  },

  newTask: function(priority) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.NEW_TASK,
      priority: priority
    });
  },

  save: function(id, name, description, estimate) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_SAVE,
      id: id,
      name: name,
      description: description,
      estimate: estimate
    })
  },

  cancel: function(id) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_CANCEL,
      id: id
    })
  },

  quickAddOpen: function() {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_QUICK_ADD_OPEN
    })
  },

  quickAddClose: function() {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_QUICK_ADD_CLOSE
    })
  }


};

module.exports = TaskActions;