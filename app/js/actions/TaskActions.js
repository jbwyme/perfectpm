/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TaskActions
 */

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

  save: function(id, name, description, estimate) {
    debugger;
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
  }

};

module.exports = TaskActions;