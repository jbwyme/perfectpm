var TasksCollection = require('./TasksCollection');
var OrgsCollection = require('./OrgsCollection');
var UserModel = Backbone.Model.extend({
	urlRoot: '/api/users',
	getName: function() {
		return this.get("first_name") + " " + this.get("last_name");
	},

	parse: function(user) {
		user.tasks = new TasksCollection(user.tasks);
		user.orgs = new OrgsCollection(user.orgs);
		return user;
	}
});

module.exports = UserModel;