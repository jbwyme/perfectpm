var React = require('react');

var App = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        <div className="header">PerfectPM - Project Management</div>
        <div className="nav">
          <ul>
            <li><a href="#">My tasks</a></li>
          </ul>
        </div>
        <div className="body"></div>
        <div className="footer"></div>
      </div>
  	);
  },

});

module.exports = App;