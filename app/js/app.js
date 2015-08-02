var React = require('react');
require('less/index')

var App = require('./components/App.react');

React.render(
  <App />,
  document.getElementById('react-app')
);