var React = require('react');
var ReactDOM = require('react-dom');
var Switch = require('react-switch');

var App = React.createClass({
	render () {
		return (
			<div>
				<h2> On By default </h2>
				<Switch active />

				<h2> Off By default </h2>
				<Switch inactive />

				<h2> Custom Colors </h2>
				<Switch circleStyles={{ onColor: 'blue', offColor: 'red' }} />

				<h2> Custom Diameter </h2>
				<Switch circleStyles={{ diameter: 55 }} />
				<br />
				<Switch circleStyles={{ diameter: 20 }} />

				<h2> Custom Switch Width </h2>
				<Switch switchStyles={{ width: 50 }} />
				<br />
				<Switch switchStyles={{ width: 200 }} />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
