var React = require('react');
var ReactPropTypes = React.PropTypes;
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var TaskModel = require('../models/Tasks').Model;

var TaskViewer = React.createClass({

    propTypes: {
        task: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
        return this._getState();
    },

    componentDidMount: function() {
        AppStore.addChangeListener(this._onAppStoreChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onAppStoreChange);
    },

    render: function() {
        var task = this.props.task;

        return (
            <div className="task-viewer">
                <input type="hidden" ref="id" value={task.id} />
                <div>
                    <label htmlFor="task-name-input">Name:</label>
                    <input ref="name" id="task-name-input" type="text" value={this.state.name} onChange={this._nameChanged} />
                </div>
                <div>
                    <label htmlFor="task-description-input">Description:</label>
                    <textarea ref="description" value={this.state.description} onChange={this._descriptionChanged} />
                </div>
                 <div>
                    <label htmlFor="task-effort-input">Effort:</label>
                    <input ref="estimate" type="text" value={this.state.estimate} onChange={this._estimateChanged} /> days
                </div>
                <button onClick={this._save}>Save</button>
                <button onClick={this._cancel}>Close</button>
            </div>
        );
    },

    _nameChanged: function(e) {
        this.setState({name: e.target.value});
    },

    _descriptionChanged: function(e) {
        this.setState({description: e.target.value});
    },

    _estimateChanged: function(e) {
        this.setState({estimate: e.target.value});
    },

    _getState: function() {
        var task = this.props.task;
        return {
            taskId: task.get('id'),
            name: task.get('name'),
            description: task.get('description'),
            estimate: task.get('estimate')
        }
    },

    _onAppStoreChange: function() {
        this.setState(this._getState);
    },

    _save: function() {
        this.props.task.set({
            id: this.state.taskId,
            name: this.state.name,
            description: this.state.description,
            estimate: this.state.estimate
        });
        AppActions.saveTask(this.props.task);
    },

    _cancel: function() {
        AppActions.exitTask();
    }

});

module.exports = TaskViewer;
