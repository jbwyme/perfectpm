var TaskModel = Backbone.Model.extend({
	defaults: {
		name: 'Untitled',
		description: 'Untitled',
		createdByUserId: 1,
		estimate: 1
	},
	urlRoot: '/api/tasks'
});

module.exports = TaskModel;