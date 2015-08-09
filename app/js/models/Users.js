var TasksCollection = require('./Tasks').Collection;
var OrgsCollection = require('./Orgs').Collection;
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

var UsersCollection = Backbone.Collection.extend({
	url: function() {
		return "/api/orgs/" + this.orgId + "/users";
	},

	model: UserModel
});

module.exports = {
	Collection: UsersCollection,
	Model: UserModel
}