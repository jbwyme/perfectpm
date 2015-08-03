var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskActions = require('../actions/TaskActions');

var TaskViewer = React.createClass({

  propTypes: {
   task: ReactPropTypes.object.isRequired
  },

  render: function() {
    var task = this.props.task;
    return (
      <div className="task-viewer">
        <input type="hidden" ref="id" value={task.id} />
        <div>
          <label htmlFor="task-name-input">Name:</label>
          <input ref="name" id="task-name-input" type="text" defaultValue={task.get('name')} />
        </div>
        <div>
          <label htmlFor="task-description-input">Description:</label>
          <textarea ref="description" defaultValue={task.get('description')} />
        </div>
         <div>
          <label htmlFor="task-effort-input">Effort:</label>
          <input ref="estimate" type="text" defaultValue={task.get('estimate')} /> days
        </div>
        <button onClick={this._save}>Save</button>
        <button onClick={this._cancel}>Cancel</button>
      </div>
    );
  },

  _save: function() {
    // probably not the right way to be doing this
    TaskActions.save(
      React.findDOMNode(this.refs.id).value, 
      React.findDOMNode(this.refs.name).value, 
      React.findDOMNode(this.refs.description).value, 
      React.findDOMNode(this.refs.estimate).value
    );
  },

  _cancel: function() {
    TaskActions.cancel();
  }

});

module.exports = TaskViewer;
