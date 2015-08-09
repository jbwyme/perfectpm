var UsersCollection = Backbone.Collection.extend({
	url: function() {
		return "/api/orgs/" + this.orgId + "/users";
	},

	model: require('./UserModel')
});

module.exports = UsersCollection;