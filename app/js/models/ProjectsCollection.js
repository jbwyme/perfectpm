var ProjectsCollection = Backbone.Collection.extend({
	url: function() {
		return "/api/orgs/" + this.orgId + "/projects";
	},

	model: require('./ProjectModel'),

});

module.exports = ProjectsCollection;