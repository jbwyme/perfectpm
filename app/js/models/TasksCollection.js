var TasksCollection = Backbone.Collection.extend({
	url: '/api/tasks',
	model: require('./TaskModel')
});

module.exports = TasksCollection;