var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProjectConstants = require('../constants/ProjectConstants');

var ProjectActions = {

  save: function(id, name) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_SAVE,
      id: id,
      name: name
    })
  },

  quickAddOpen: function() {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_QUICK_ADD_OPEN
    })
  },

  quickAddClose: function() {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_QUICK_ADD_CLOSE
    })
  }

};

module.exports = ProjectActions;