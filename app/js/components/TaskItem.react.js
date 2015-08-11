var React = require('react');
var ReactPropTypes = React.PropTypes;

var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var TaskItem = React.createClass({

  propTypes: {
   task: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return this._buildState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var task = this.props.task;
    var selected;
    var autoFocus = "false";
    if (this.state.viewingTask && this.state.viewingTask.cid === task.cid) {
      selected = "selected";
      if (this.state.taskIsFocused) {
        autoFocus = "true";
      }
    }
    return (
      <li
        key={task.id} data-id={task.id} onClick={this._onClick} className={selected}>
        <i className="handle fa fa-bars"></i>
        <input type="checkbox" />
        <textarea className="task-input" rows="1" autoFocus={autoFocus}
          onKeyPress={this._onInputKeyPress} onKeyUp={this._onInputKeyUp} defaultValue={task.get('name')}
          onFocus={this._onInputFocus} />
      </li>
    );
  },

  _onChange: function() {
    this.setState(this._buildState())
  },

  _onInputFocus: function(e) {
    AppActions.viewTask(this.props.task);
    if (this.props.task.get('name') === "Untitled") {
      $(e.target).select();
    }
  },

  _onInputKeyUp: function(e) {
    if (e.which !== 13) {
      this.props.task.set('name', $(e.target).val());
      AppActions.saveTask(this.props.task);
    }
  },

  _onInputKeyPress: function(e) {
    if (e.which === 13) {
      AppActions.newTask(AppStore.getTaskList(), this.props.task.get('priority') + 1);
      e.preventDefault();
    }
  },

  _onClick: function(e) {
    AppActions.viewTask(this.props.task);
  },

  _buildState: function() {
    return {
      viewingTask: AppStore.getSelectedTask(),
      taskIsFocused: true
    }
  },

});

module.exports = TaskItem;
