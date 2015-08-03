var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskItem = require('./TaskItem.react');

var TaskList = React.createClass({
  render: function() {

    var tasks = [];
    this.props.tasks.each(function(taskModel) {
      tasks.push(<TaskItem key={taskModel.cid} task={taskModel.attributes} />);
    });

    return (
      <ul className="task-list">{tasks}</ul>
    );
  },
});

module.exports = TaskList;
