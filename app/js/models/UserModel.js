var UserModel = Backbone.Model.extend({
	url: '/api/users',
	getName: function() {
		return this.get("firstName") + " " + this.get("lastName");
	}
});

module.exports = UserModel;