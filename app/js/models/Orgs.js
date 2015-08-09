var OrgModel = Backbone.Model.extend({
	urlRoot: '/api/orgs'
});

var OrgsCollection = Backbone.Collection.extend({
	url: '/api/orgs',
	model: OrgModel
});

module.exports = {
	Collection: OrgsCollection,
	Model: OrgModel
};