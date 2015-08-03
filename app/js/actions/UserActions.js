/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * UserActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');

var UserActions = {

  save: function(id, firstName, lastName, email, password) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_SAVE,
      id: id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    })
  },

  quickAddOpen: function() {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_QUICK_ADD_OPEN
    })
  },

  quickAddClose: function() {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_QUICK_ADD_CLOSE
    })
  }

};

module.exports = UserActions;