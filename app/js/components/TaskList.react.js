var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskItem = require('./TaskItem.react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var TaskList = React.createClass({

	getInitialState: function() {
  		return this._getState();
	},

	componentDidMount: function() {
  		AppStore.addChangeListener(this._onAppStoreChange);

		$('.task-list').sortable({
			handle: ".handle",
			placeholder: "sortable-placeholder",
			opacity: 0.5,
		  	update: _.bind(function(e, ui) {
				AppActions.changeTaskPriority(this.state.taskList, ui.item.data('id'), ui.item.index() + 1);
		  	}, this)
		});
	},

	componentWillUnmount: function() {
  		AppStore.removeChangeListener(this._onAppStoreChange);
	},

	render: function() {

		var tasks = [];
		if (this.state.taskList) {
			this.state.taskList.get('tasks').each(function(taskModel) {
				tasks.push(<TaskItem key={taskModel.cid} task={taskModel} />);
			});
		}

		return (
			<div>
				<ul className="task-list">{tasks}</ul>
				<button onClick={this._newTaskClick}>New task</button>
			</div>
		);
	},

	_newTaskClick: function() {
		AppActions.newTask(this.state.taskList, this.state.taskList.get('tasks').size() + 1);
	},

	_onAppStoreChange: function() {
		this.setState(this._getState());
	},

	_getState: function() {
		return {
      		taskList: AppStore.getTaskList()
		}
	}
});

module.exports = TaskList;
