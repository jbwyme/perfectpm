var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var UsersCollection = require('../models/UsersCollection');
var UserModel = require('../models/UserModel');
var UserConstants = require('../constants/UserConstants');

var _users = new UsersCollection();
_users.fetch().done(function() {
  UserStore.emitChange();
});

var _quickAddOpen = false;

var UserStore = assign({}, EventEmitter.prototype, {

  getUsers: function() {
    return _users;
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

    case UserConstants.USER_SAVE:
      (new UserModel(action)).save();
      _users.fetch();
      UserStore.emitChange();
      break;

    case UserConstants.USER_QUICK_ADD_OPEN:
      _quickAddOpen = true;
      UserStore.emitChange();
      break;

    case UserConstants.USER_QUICK_ADD_CLOSE:
      _quickAddOpen = false;
      UserStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = UserStore;
