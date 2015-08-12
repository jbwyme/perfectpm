var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var AppStore = require('../stores/AppStore');

var OrgModel = require('../models/Orgs').Model;
var UserModel = require('../models/Users').Model;
var UsersCollection = require('../models/Users').Collection;
var ProjectModel = require('../models/Projects').Model;
var ProjectsCollection = require('../models/Projects').Collection;
var TaskModel = require('../models/Tasks').Model;
var TasksCollection = require('../models/Tasks').Collection;
var TaskList = require('../models/Tasks').TaskList;

var AppActions = {

    register: function(orgName, firstName, lastName, email) {
        $.ajax('/api/register', {
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                orgName: orgName,
                firstName: firstName,
                lastName: lastName,
                email: email
            })
        })
        .fail(function(resp) {
           throw "Unabled to register: " + resp;
        })
        .done(function(userJson) {
            var user = new UserModel(userJson);
            user.fetch().done(function() {
                AppDispatcher.dispatch({
                    actionType: AppConstants.LOGGED_IN,
                    user: user
                });
                AppActions.showOrg(user.get('orgs').at(0).id);
            });
        });
    },

    login: function(email) {
        $.getJSON('/api/login/' + email)
            .fail(function(jqXHR, errorText, errorThrown) {
                alert("Failed to login: " + errorThrown);
            })
            .done(function(userJson) {
                var user = new UserModel(userJson);
                user.fetch().done(function() {
                    AppDispatcher.dispatch({
                        actionType: AppConstants.LOGGED_IN,
                        user: user
                    });

                    AppActions.showOrg(user.get('orgs').at(0).id);
                });
            });
    },

    logout: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.LOGGED_OUT
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

    showProject: function(id) {
        var project = new ProjectModel({id: id});
        project.fetch().done(function() {
            var taskList = new TaskList({id: project.get('task_list_id')});
            taskList.fetch().done(function() {
                AppDispatcher.dispatch({
                    actionType: AppConstants.SHOW_PROJECT,
                    project: project,
                    taskList: taskList
                });
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

    viewTask: function(task) {
        AppDispatcher.dispatch({
            actionType: AppConstants.VIEW_TASK,
            task: task
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

    changeTaskPriority: function(taskList, taskId, priority) {
        taskList.updatePriority(taskId, priority).done(function() {
            AppDispatcher.dispatch({
                actionType: AppConstants.TASK_PRIORITY_CHANGED,
                taskList: taskList,
                taskId: taskId,
                priority: priority
            });
        });
    },

    exitTask: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.EXIT_TASK
        });
    },

    newTask: function(taskList, priority) {
        var task = new TaskModel({priority: priority});
        var $save = task.save();
        AppDispatcher.dispatch({
            actionType: AppConstants.ADD_TASK,
            task: task
        });
        $save.done(function(res) {
            task.set('id', res.insertId);
            taskList.addTask(task.id, priority);
        });
    },

    showAddProject: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.SHOW_ADD_PROJECT
        });
    },

    addProject: function(projectName) {
        var project = new ProjectModel({
            name: projectName,
            description: projectName,
            org_id: AppStore.getSelectedOrg().id,
            created_by_user_id: AppStore.getLoggedInUser().id
        });
        project.save().done(function() {
            AppDispatcher.dispatch({
                actionType: AppConstants.PROJECT_ADDED,
                project: project
            });
        });
    },

    hideAddProject: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.HIDE_ADD_PROJECT
        });
    },

    showAddUser: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.SHOW_ADD_USER
        });
    },

    addUser: function(firstName, lastName, email) {
        var user = new UserModel({
            first_name: firstName,
            last_name: lastName,
            email: email,
            org_id: AppStore.getSelectedOrg().id,
            created_by_user_id: AppStore.getLoggedInUser().id
        });
        user.save().done(function() {
            AppDispatcher.dispatch({
                actionType: AppConstants.USER_ADDED,
                user: user
            });
        });
    },

    hideAddUser: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.HIDE_ADD_USER
        });
    },

    showUser: function(userId, orgId) {
        var user = new UserModel({id: userId});
        var $userFetch = user.fetch();
        var $taskListIdFetch = user.getTaskListId(orgId);
        $.when($userFetch, $taskListIdFetch).done(function(user, taskListId) {
            var taskList = new TaskList({id: taskListId});
            taskList.fetch().done(function() {
                AppDispatcher.dispatch({
                    actionType: AppConstants.SHOW_USER,
                    user: user,
                    taskList: taskList
                });
            });
        });
    }
};

module.exports = AppActions;