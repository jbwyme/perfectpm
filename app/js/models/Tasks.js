var TaskModel = Backbone.Model.extend({
	defaults: {
		name: 'Untitled',
		description: 'Untitled',
		createdByUserId: 1,
		estimate: 1
	},
	urlRoot: '/api/tasks'
});

var TasksCollection = Backbone.Collection.extend({
	urlRoot: '/api/tasks',
	model: TaskModel,
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

var TaskList = Backbone.Model.extend({
	urlRoot: '/api/task_list',
	parse: function(taskList) {
		taskList.tasks = new TasksCollection(taskList.tasks);
		return taskList;
	},
	addTask: function(taskId, priority) {
		return $.ajax('/api/task_list/' + this.id + '/tasks/' + taskId, {
			method: 'post',
			contentType: 'application/json',
			data: JSON.stringify({priority: priority}),
		}).fail(_.bind(function() {
			throw("failed to add task " + taskId + " to list " + this.id + " at priority " + priority);
		}, this));
	},
	updatePriority: function(taskId, priority) {
		return $.ajax('/api/task_list/' + this.id + '/tasks/' + taskId, {
			method: 'put',
			contentType: 'application/json',
			data: JSON.stringify({priority: priority}),
		}).fail(_.bind(function() {
			throw("failed to update priority for task " + taskId + " on list " + this.id + " at priority " + priority);
		}, this));
	}
})

module.exports = {
	Collection: TasksCollection,
	Model: TaskModel,
	TaskList: TaskList
};