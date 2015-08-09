var TasksCollection = Backbone.Collection.extend({
	url: '/api/tasks',
	model: require('./TaskModel'),
	comparator: "priority",

	add: function(model) {
		this.each(function(task) {
			if (task.get('priority') >= model.get('priority')) {
				task.set('priority', task.get('priority') + 1);
			}
		});
		Backbone.Collection.prototype.add.apply(this, arguments);
	}
});

module.exports = TasksCollection;