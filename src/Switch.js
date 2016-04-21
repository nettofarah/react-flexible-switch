import React from 'react';
import classNames from 'classnames';
import { merge, events, disableScroll, reEnableScroll } from './utils';

class Switch extends React.Component {

	constructor(props) {
		super(props);

		this.onSlideEnd = this.onSlideEnd.bind(this);
		this.onSlideStart = this.onSlideStart.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

		let activeState = false;

		if (typeof this.props.active == 'undefined' && typeof this.props.inactive == 'undefined') {
			activeState = false;
		}

		if (typeof this.props.active != 'undefined' && this.props.active) {
			activeState = true;
		}

		if (typeof this.props.inactive != 'undefined' && this.props.inactive) {
			activeState = false;
		}

		this.state = { sliding: false, active: activeState };
	}

	componentDidMount() {
		document.addEventListener(events.touch.start, this.onSlideStart, false);
		document.addEventListener(events.mouse.start, this.onSlideStart, false);
		document.addEventListener(events.touch.stop, this.onSlideEnd, false);
		document.addEventListener(events.mouse.stop, this.onSlideEnd, false);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.active != prevState.active) {
			const callback = this.state.active ? this.props.onActive : this.props.onInactive;
			callback && callback();
		}
	}

	componentWillUnmount() {
		document.removeEventListener(events.touch.start, this.onSlideStart, false);
		document.removeEventListener(events.mouse.start, this.onSlideStart, false);
		document.removeEventListener(events.touch.stop, this.onSlideEnd, false);
		document.removeEventListener(events.mouse.stop, this.onSlideEnd, false);
	}

	onSlideEnd() {
		if (this.state.sliding) {
			this.setState({ sliding: false, active: !this.state.active });
			reEnableScroll();
		}
	}

	onSlideStart(e) {
		if (e.target == this.refs.circle || e.target == this.refs.switch) {
			this.setState({ sliding: true });
			disableScroll();
		}
	}

	onMouseLeave(e) {
		this.onSlideEnd(e);
	}

	classes() {
		return classNames(
			'switch',
			{ sliding: this.state.sliding },
			{ active: this.state.active },
			{ inactive: !this.state.active }
		);
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
		let translation = this.state.active ? offset : 0;

		if (this.state.sliding && this.state.active) {
			translation -= (circleStyles.diameter / 2 + switchStyles.padding / 2);
		}

		return {
			transform: `translateX(${translation}px)`
		};
	}

	backgroundStyle() {
		const circleStyles = this.circleStylesProps();
		const backgroundColor = this.state.active ? circleStyles.onColor : circleStyles.offColor;
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
		const width = this.state.sliding ? (circleStyles.diameter + circleStyles.diameter / 2)  : circleStyles.diameter;
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
	display: 'flex',
	position: 'relative',
	backgroundColor: 'white',
  'box-sizing': 'content-box'
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
	active: React.PropTypes.bool,

	circleStyles: React.PropTypes.shape({
		onColor: React.PropTypes.string,
		offColor: React.PropTypes.string,
		diameter: React.PropTypes.number
	}),

	inactive: React.PropTypes.bool,

	onActive: React.PropTypes.func,
	onInactive: React.PropTypes.func,

	switchStyles: React.PropTypes.shape({
		width: React.PropTypes.number
	})
};

Switch.defaultProps = {
	onInactive: function() {},
	onActive: function() {},
	circleStyles: defaultCircleStyles,
	switchStyles: defaultSwitchStyles
};

export default Switch;
