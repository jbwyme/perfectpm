var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var OrgModel = require('../models/OrgModel');
var UserModel = require('../models/UserModel');
var UsersCollection = require('../models/UsersCollection');
var ProjectModel = require('../models/ProjectModel');
var ProjectsCollection = require('../models/ProjectsCollection');
var TaskModel = require('../models/TaskModel');

var AppActions = {

  login: function(userId) {
    var user = new UserModel({id: userId});
    user.fetch().done(function() {
      AppDispatcher.dispatch({
        actionType: AppConstants.LOGGED_IN,
        user: user
      });
      AppActions.showOrg(user.get('orgs').at(0).id);
    });
  },

  showOrg: function(orgId) {
    var org = new OrgModel({id: orgId});
    var users = new UsersCollection();
    users.orgId = orgId;
    var projects = new ProjectsCollection();
    projects.orgId = orgId;
    var $orgDfr = org.fetch();
    var $usersDfr = users.fetch();
    var $projectsDfr = projects.fetch();
    $.when($orgDfr, $usersDfr, $projectsDfr).done(function() {
      AppDispatcher.dispatch({
        actionType: AppConstants.SHOW_ORG,
        org: org,
        users: users,
        projects: projects
      });
    });
  },

  showUser: function(id) {
    var user = new UserModel({id: id});
    user.fetch().done(function() {
      AppDispatcher.dispatch({
        actionType: AppConstants.SHOW_USER,
        user: user
      });
    });
  },

  showProject: function(id) {
    var project = new ProjectModel({id: id});
    project.fetch().done(function() {
      AppDispatcher.dispatch({
        actionType: AppConstants.SHOW_PROJECT,
        project: project
      });
    });
  },

  saveProject: function(project) {
    project.save().done(function() {
       AppDispatcher.dispatch({
        actionType: AppConstants.PROJECT_SAVED,
        project: project
      });
    });
  },

  saveTask: function(task) {
    task.save().done(function() {
       AppDispatcher.dispatch({
        actionType: AppConstants.TASK_SAVED,
        task: task
      });
    });
  },

  changeTaskPriority: function(id, from, to) {
    alert('priority changed');

    AppDispatcher.dispatch({
      actionType: AppConstants.TASK_PRIORITY_CHANGED,
      id: id
    });
  },

  viewTask: function(task) {
    AppDispatcher.dispatch({
      actionType: AppConstants.VIEW_TASK,
      task: task
    });
  },

  exitTask: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.EXIT_TASK
    });
  },

  newTask: function(priority) {
    var task = new TaskModel({priority: priority});
    AppDispatcher.dispatch({
      actionType: AppConstants.ADD_TASK,
      task: task
    });
  },

};

module.exports = AppActions;