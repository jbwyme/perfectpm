var TasksCollection = require('./TasksCollection');
var ProjectModel = Backbone.Model.extend({
	urlRoot: '/api/projects',
	parse: function(project) {
		project.tasks = new TasksCollection(project.tasks);
		return project;
	}
});

module.exports = ProjectModel;