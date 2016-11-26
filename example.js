require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Switch = require('react-flexible-switch');

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return { locked: true, externalValue: true };
	},

	render: function render() {
		var _this = this;

		return React.createElement(
			'div',
			null,
			React.createElement(
				'h2',
				null,
				' On By default '
			),
			React.createElement(Switch, { value: true }),
			React.createElement(
				'h2',
				null,
				' Off By default '
			),
			React.createElement(Switch, { value: false }),
			React.createElement(
				'h2',
				null,
				' Custom Colors '
			),
			React.createElement(Switch, { circleStyles: { onColor: 'blue', offColor: 'red' } }),
			React.createElement(
				'h2',
				null,
				' Custom Diameter '
			),
			React.createElement(Switch, { circleStyles: { diameter: 55 } }),
			React.createElement('br', null),
			React.createElement(Switch, { circleStyles: { diameter: 20 } }),
			React.createElement(
				'h2',
				null,
				' Custom Switch Width '
			),
			React.createElement(Switch, { switchStyles: { width: 50 } }),
			React.createElement('br', null),
			React.createElement(Switch, { switchStyles: { width: 200 } }),
			React.createElement(
				'h2',
				null,
				' Labels '
			),
			React.createElement(Switch, { labels: { on: 'On', off: 'Off' } }),
			React.createElement(
				'h2',
				null,
				' Locking the Switch '
			),
			React.createElement(
				'button',
				{ onClick: function () {
						return _this.setState({ locked: false });
					} },
				'Unlock Switch'
			),
			React.createElement(
				'button',
				{ onClick: function () {
						return _this.setState({ locked: true });
					} },
				'Lock Switch'
			),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement(Switch, { locked: this.state.locked }),
			React.createElement('br', null),
			React.createElement(
				'h2',
				null,
				' External Controls '
			),
			React.createElement(
				'button',
				{ onClick: function () {
						return _this.setState({ externalValue: !_this.state.externalValue });
					} },
				'Toggle Switches'
			),
			React.createElement('br', null),
			React.createElement('br', null),
			React.createElement(Switch, { locked: true, value: this.state.externalValue, onChange: function (value) {
					_this.setState({ externalValue: value });
				} }),
			React.createElement('br', null),
			React.createElement(Switch, { locked: true, value: !this.state.externalValue, onChange: function (value) {
					_this.setState({ externalValue: !value });
				} })
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-flexible-switch":undefined}]},{},[1]);
