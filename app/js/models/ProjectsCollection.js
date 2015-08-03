var ProjectsCollection = Backbone.Collection.extend({
	url: '/api/projects',
	model: require('./ProjectModel')
});

module.exports = ProjectsCollection;