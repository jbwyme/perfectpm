/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var TaskItem = React.createClass({

  propTypes: {
   task: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var key = this.props.key;
    var task = this.props.task;
    return (
      <li
        key={key}>
        {task.name}
      </li>
    );
  }

});

module.exports = TaskItem;
