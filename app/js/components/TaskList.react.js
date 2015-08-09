var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskItem = require('./TaskItem.react');
var AppStore = require('../stores/AppStore');

var TaskList = React.createClass({

	getInitialState: function() {
    	return this._getState();
  	},

  	componentDidMount: function() {
    	AppStore.addChangeListener(this._onChange);

  		$('.task-list').sortable({
  			handle: ".handle",
  			placeholder: "sortable-placeholder",
  			opacity: 0.5,
  		});
  	},

  	componentWillUnmount: function() {
    	AppStore.removeChangeListener(this._onChange);
  	},

  	render: function() {

	    var tasks = [];
      if (this.props.tasks) {
  	    this.props.tasks.each(function(taskModel) {
  	      	tasks.push(<TaskItem key={taskModel.cid} task={taskModel} />);
  	    });
      }

	    return (
	      	<ul className="task-list">{tasks}</ul>
	    );
  	},

  	_onChange: function() {
  		return this._getState();
  	},

  	_getState: function() {
  		return {
  			numTasks: !this.props.task ? 0 : this.props.tasks.size()
  		}
  	}


});

module.exports = TaskList;
