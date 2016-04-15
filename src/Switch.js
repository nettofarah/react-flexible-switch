import React from 'react';

const events = {
  touch: {
    start: 'touchstart',
    stop: 'touchend',
		move: 'touchmove'
  },
  mouse: {
    start: 'mousedown',
    stop: 'mouseup'
  }
};

function preventScroll(e) {
	e.preventDefault();
}

class Switch extends React.Component {

	constructor(props) {
		super(props);

		this.onSlideEnd = this.onSlideEnd.bind(this);
		this.onSlideStart = this.onSlideStart.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

		const onOff = !!this.props.on ? true : false;
		this.state = { dragging: false, on: onOff };
	}

	componentDidMount() {
		document.addEventListener(events.touch.start, this.onSlideStart, false);
		document.addEventListener(events.mouse.start, this.onSlideStart, false);
		document.addEventListener(events.touch.stop, this.onSlideEnd, false);
		document.addEventListener(events.mouse.stop, this.onSlideEnd, false);

	}

	componentWillUnmount() {
		document.removeEventListener(events.touch.start, this.onSlideStart, false);
		document.removeEventListener(events.mouse.start, this.onSlideStart, false);
		document.removeEventListener(events.touch.stop, this.onSlideEnd, false);
		document.removeEventListener(events.mouse.stop, this.onSlideEnd, false);
	}

	onSlideEnd() {
		if (this.state.dragging) {
			this.setState({ dragging: false, on: !this.state.on });

			const newState = !this.state.on;
			const callback = newState ? this.props.onActive : this.props.onInactive;
			callback && callback();

			// no longer prevent scrolling on mobile
			document.removeEventListener(events.touch.move, preventScroll, false);
		}
	}

	onSlideStart(e) {
		if (e.target == this.refs.circle || e.target == this.refs.switch) {
			this.setState({ dragging: true });

			// prevent scrolling on mobile
			document.addEventListener(events.touch.move, preventScroll, false);
		}
	}

	onMouseLeave(e) {
		this.onSlideEnd(e);
	}

	classes() {
		return [
			'switch',
			this.state.dragging ? 'dragging' : '',
			this.state.on ? 'on' : 'off'
		].join(' ');
	}

	switchStyles() {
		const switchStyles = this.switchStylesProps();
		return merge(
			{ borderRadius: switchStyles.width / 2 },
		  switchStyles
		);
	}

	translationStyle() {
		const circleStyles = this.circleStylesProps();
		const switchStyles = this.switchStyles();

		const offset = switchStyles.width - circleStyles.diameter;
		let translation = this.state.on ? offset : 0;

		if (this.state.dragging && this.state.on) {
			translation -= (circleStyles.diameter / 2 + switchStyles.padding);
		}

		return {
			transform: `translateX(${translation}px)`
		};
	}

	backgroundStyle() {
		const circleStyles = this.circleStylesProps();
		const backgroundColor = this.state.on ? circleStyles.onColor : circleStyles.offColor;
		return { backgroundColor };
	}

	circleStylesProps() {
		return merge(defaultCircleStyles, this.props.circleStyles);
	}

	switchStylesProps() {
		return merge(defaultSwitchStyles, this.props.switchStyles);
	}

	circleDimensionsStyle() {
		const switchStyles = this.switchStyles();
		const circleStyles = this.circleStylesProps();
		const width = this.state.dragging ? (circleStyles.diameter + circleStyles.diameter / 2)  : circleStyles.diameter;
		return { width, height: circleStyles.diameter };
	}

	circleStyles() {
		return merge(
			this.circleDimensionsStyle(),
			this.backgroundStyle(),
			this.translationStyle(),
			this.circleStylesProps()
		);
	}

	render() {
		return (
			<span style={this.switchStyles()}
					 className={this.classes()}
					 ref="switch"
					 onMouseLeave={this.onMouseLeave}>
				<span style={this.circleStyles()} className="circle" ref="circle"></span>
			</span>
		);
	}
}

const defaultSwitchStyles = {
	width: 100,
	padding: 4,
	border: '1px solid #CFCFCF',
	display: 'inline-block',
	backgroundColor: 'white'
};

const defaultCircleStyles = {
	diameter: 35,
	borderRadius: 35,
	display: 'block',
	transition: 'transform 200ms, width 200ms, background-color 200ms',
	onColor: '#70D600',
	offColor: '#CFCFCF'
};

Switch.propTypes = {
	circleStyles: React.PropTypes.shape({
		onColor: React.PropTypes.string,
		offColor: React.PropTypes.string,
		diameter: React.PropTypes.number
	}),

	off: React.PropTypes.bool,
	on: React.PropTypes.bool,

	onActive: React.PropTypes.func,
	onInactive: React.PropTypes.func,

	switchStyles: React.PropTypes.shape({
		width: React.PropTypes.number
	})
};

Switch.defaultProps = {
	on: true,
	onInactive: function() {},
	onActive: function() {},
	circleStyles: defaultCircleStyles,
	switchStyles: defaultSwitchStyles
};

function merge(...hashes) {
	return Object.assign({}, ...hashes);
}

export default Switch;
