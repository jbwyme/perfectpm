var React = require('react');
var ReactPropTypes = React.PropTypes;

var TaskActions = require('../actions/TaskActions');

var TaskItem = React.createClass({

  propTypes: {
   task: ReactPropTypes.object.isRequired
  },

  render: function() {
    var key = this.props.key;
    var task = this.props.task;
    return (
      <li
        key={key} data-id={task.cid} onClick={this._onClick}>
        {task.get('name')}
      </li>
    );
  },

  _onClick: function(e) {
    TaskActions.view($(e.target).data('id'));
  }

});

module.exports = TaskItem;
