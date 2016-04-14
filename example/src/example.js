var React = require('react');
var ReactDOM = require('react-dom');
var Switch = require('react-switch');

var App = React.createClass({
	render () {
		return (
			<div>
				<h2> On By default </h2>
				<Switch on />

				<h2> Off By default </h2>
				<Switch off />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
