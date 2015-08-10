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
	},

	getTaskListId: function(orgId) {
		$dfr = $.Deferred();
		$.getJSON('/api/orgs/' + orgId + '/users/' + this.id)
		.fail(function(jqXHR, textStatus, errorThrown) {
			throw("Failed to fetch org user for org id " + orgId + " and user id " + this.id);
		})
		.done(function(orgUser) {
			$dfr.resolve(orgUser.task_list_id);
		});
		return $dfr;
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