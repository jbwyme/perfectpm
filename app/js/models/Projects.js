var TasksCollection = require('./Tasks').Collection;

var ProjectModel = Backbone.Model.extend({
	urlRoot: '/api/projects',
	parse: function(project) {
		project.tasks = new TasksCollection(project.tasks);
		return project;
	}
});

var ProjectsCollection = Backbone.Collection.extend({
	url: function() {
		return "/api/orgs/" + this.orgId + "/projects";
	},
	model: ProjectModel,

});

module.exports = {
	Model: ProjectModel,
	Collection: ProjectsCollection
}
