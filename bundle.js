require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-switch":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Switch = (function (_React$Component) {
	_inherits(Switch, _React$Component);

	function Switch(props) {
		_classCallCheck(this, Switch);

		_get(Object.getPrototypeOf(Switch.prototype), 'constructor', this).call(this, props);

		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

		var onOff = !!this.props.on ? true : false;
		this.state = { dragging: false, on: onOff };
	}

	_createClass(Switch, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener('mouseup', this.onMouseUp, false);
			document.addEventListener('mousedown', this.onMouseDown, false);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener('mouseup', this.onMouseUp, false);
			document.removeEventListener('mousedown', this.onMouseDown, false);
		}
	}, {
		key: 'onMouseUp',
		value: function onMouseUp() {
			if (this.state.dragging) {
				this.setState({ dragging: false, on: !this.state.on });

				var newState = !this.state.on;
				var callback = newState ? this.props.switchOn : this.props.switchOff;
				callback && callback();
			}
		}
	}, {
		key: 'onMouseDown',
		value: function onMouseDown(e) {
			if (e.target == this.refs.circle || e.target == this.refs['switch']) {
				this.setState({ dragging: true });
			}
		}
	}, {
		key: 'onMouseLeave',
		value: function onMouseLeave(e) {
			this.onMouseUp(e);
		}
	}, {
		key: 'classes',
		value: function classes() {
			return ['switch', this.state.dragging ? 'dragging' : '', this.state.on ? 'on' : 'off'].join(' ');
		}
	}, {
		key: 'switchStyles',
		value: function switchStyles() {
			var switchStyles = this.switchStylesProps();
			return merge({ borderRadius: switchStyles.width / 2 }, switchStyles);
		}
	}, {
		key: 'translationStyle',
		value: function translationStyle() {
			var circleStyles = this.circleStylesProps();
			var switchStyles = this.switchStyles();

			var offset = switchStyles.width - circleStyles.diameter;
			var translation = this.state.on ? offset : 0;

			if (this.state.dragging && this.state.on) {
				translation -= circleStyles.diameter / 2 + switchStyles.padding;
			}

			return {
				transform: 'translateX(' + translation + 'px)'
			};
		}
	}, {
		key: 'backgroundStyle',
		value: function backgroundStyle() {
			var circleStyles = this.circleStylesProps();
			var backgroundColor = this.state.on ? circleStyles.onColor : circleStyles.offColor;
			return { backgroundColor: backgroundColor };
		}
	}, {
		key: 'circleStylesProps',
		value: function circleStylesProps() {
			return merge(defaultCircleStyles, this.props.circleStyles);
		}
	}, {
		key: 'switchStylesProps',
		value: function switchStylesProps() {
			return merge(defaultSwitchStyles, this.props.switchStyles);
		}
	}, {
		key: 'circleDimensionsStyle',
		value: function circleDimensionsStyle() {
			var switchStyles = this.switchStyles();
			var circleStyles = this.circleStylesProps();
			var width = this.state.dragging ? circleStyles.diameter + circleStyles.diameter / 2 : circleStyles.diameter;
			return { width: width, height: circleStyles.diameter };
		}
	}, {
		key: 'circleStyles',
		value: function circleStyles() {
			return merge(this.circleDimensionsStyle(), this.backgroundStyle(), this.translationStyle(), this.circleStylesProps());
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'span',
				{ style: this.switchStyles(),
					className: this.classes(),
					ref: 'switch',
					onMouseLeave: this.onMouseLeave },
				_react2['default'].createElement('span', { style: this.circleStyles(), className: 'circle', ref: 'circle' })
			);
		}
	}]);

	return Switch;
})(_react2['default'].Component);

var defaultSwitchStyles = {
	width: 100,
	padding: 4,
	border: '1px solid #CFCFCF',
	display: 'inline-block',
	backgroundColor: 'white'
};

var defaultCircleStyles = {
	diameter: 35,
	borderRadius: 35,
	display: 'block',
	transition: 'transform 200ms, width 200ms, background-color 200ms',
	onColor: '#70D600',
	offColor: '#CFCFCF'
};

Switch.propTypes = {
	circleStyles: _react2['default'].PropTypes.shape({
		onColor: _react2['default'].PropTypes.string,
		offColor: _react2['default'].PropTypes.string,
		diameter: _react2['default'].PropTypes.number
	}),

	off: _react2['default'].PropTypes.bool,
	on: _react2['default'].PropTypes.bool,
	switchOff: _react2['default'].PropTypes.func,
	switchOn: _react2['default'].PropTypes.func,

	switchStyles: _react2['default'].PropTypes.shape({
		width: _react2['default'].PropTypes.number
	})
};

Switch.defaultProps = {
	on: true,
	switchOff: function switchOff() {},
	switchOn: function switchOn() {},
	circleStyles: defaultCircleStyles,
	switchStyles: defaultSwitchStyles
};

function merge() {
	for (var _len = arguments.length, hashes = Array(_len), _key = 0; _key < _len; _key++) {
		hashes[_key] = arguments[_key];
	}

	return _extends.apply(undefined, [{}].concat(hashes));
}

exports['default'] = Switch;
module.exports = exports['default'];

},{"react":undefined}]},{},[]);
