var cookie = require('./cookie');
var React = require('react');
var App = require('./components/App.react');
var AppActions = require('./actions/AppActions');

var renderApp = function(body) {
	React.render(
	  <App body={body} />,
	  document.getElementById('react-app')
	);
}

var AppRouter = Backbone.Router.extend({
    routes: {
    	"" : function(fragment) {
			var MyTasks = require('./components/MyTasks.react');
			renderApp(<MyTasks />);

    	},

		"logout": function() {
			AppActions.logout();
			router.navigate("/", {trigger: true});
		},

    	"project/:id" : function(id) {
    		var ProjectDetails = require('./components/ProjectDetails.react');
    		renderApp(<ProjectDetails id={id}/>);
    	},

    	"user/:id" : function(id) {
    		var UserOverview = require('./components/UserOverview.react');
    		renderApp(<UserOverview id={id}/>);
    	}

    }
}); 

// Initiate the router
var router = new AppRouter;
router.on('route', function() {
	if (cookie.get('user')) {
		AppActions.login(cookie.get('user'));
	}
});
// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();

module.exports = {router: router};
