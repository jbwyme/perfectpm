var UsersCollection = Backbone.Collection.extend({
	url: '/api/users',
	model: require('./UserModel')
});

module.exports = UsersCollection;