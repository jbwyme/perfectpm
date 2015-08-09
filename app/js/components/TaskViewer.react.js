var React = require('react');
var ReactPropTypes = React.PropTypes;
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var TaskModel = require('../models/TaskModel');

var TaskViewer = React.createClass({

  propTypes: {
   task: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return this._getState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    debugger;
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

  _getState: function() {
    return {
      taskId: this.props.task.cid
    }
  },

  _onChange: function() {
    this.setState(this._getState);
  },

  _save: function() {
    var task = new TaskModel({
      id: this.refs.id.getDOMNode().value, 
      name: this.refs.name.getDOMNode().value, 
      description: this.refs.description.getDOMNode().value, 
      estimate: this.refs.estimate.getDOMNode().value
    });
    AppActions.saveTask(task);
  },

  _cancel: function() {
    AppActions.exitTask();
  }

});

module.exports = TaskViewer;
