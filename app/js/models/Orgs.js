var OrgModel = Backbone.Model.extend({
	urlRoot: '/api/orgs'
});

OrgModel.addProject = function(orgId, projectId) {
	return $.post('/api/orgs/' + orgId + '/projects/' + projectId);
}

var OrgsCollection = Backbone.Collection.extend({
	url: '/api/orgs',
	model: OrgModel
});

module.exports = {
	Collection: OrgsCollection,
	Model: OrgModel
};