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
    var key = this.props.key;
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
        key={task.cid} data-id={task.cid} onClick={this._onClick} className={selected}>
        <i className="handle fa fa-bars"></i>
        <input type="checkbox" />
        <textarea className="task-input" rows="1" 
          onKeyPress={this._onInputKeyPress} onKeyUp={this._onInputKeyUp} autoFocus={autoFocus} defaultValue={task.get('name')}
          onFocus={this._onInputFocus} onBlur={this._onInputBlur} />
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

  _onInputBlur: function(e) {
    // AppActions.setName($(e.target).val());
  },

  _onInputKeyUp: function(e) {
    this.props.task.set('name', $(e.target).val());
    AppActions.saveTask(this.props.task);
  },

  _onInputKeyPress: function(e) {
    if (e.which === 13) {
      AppActions.newTask(this.props.task.get('priority') + 1);
      e.preventDefault();
    }
  },

  _onClick: function(e) {
    AppActions.viewTask(this.props.task);
  },

  _buildState: function() {
    return {
      viewingTask: AppStore.getSelectedTask(),
      taskIsFocused: false
    }
  },

});

module.exports = TaskItem;
