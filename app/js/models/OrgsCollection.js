var OrgsCollection = Backbone.Collection.extend({
	url: '/api/orgs',
	model: require('./OrgModel')
});

module.exports = OrgsCollection;