import React from 'react';
import classNames from 'classnames';
import Label from './Label';
import { merge, events, disableScroll, reEnableScroll } from './utils';
import { defaultSwitchStyles, defaultCircleStyles } from './styles';

class Switch extends React.Component {

	constructor(props) {
		super(props);

		this.onSlideEnd = this.onSlideEnd.bind(this);
		this.onSlideStart = this.onSlideStart.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

		const activeState = this._resolveActiveState();
		this.state = { sliding: false, active: activeState };
	}

	_resolveActiveState() {
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

		return activeState;
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
			translation -= (circleStyles.diameter / 4 + switchStyles.padding / 4);
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
		const circleStyles = this.circleStylesProps();
		const width = this.state.sliding ? (circleStyles.diameter + circleStyles.diameter / 4)  : circleStyles.diameter;
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

				<Label active={this.state.active} labels={this.props.labels} />
				<span style={this.circleStyles()} className="circle" ref="circle"></span>
			</span>
		);
	}
}

Switch.propTypes = {
	active: React.PropTypes.bool,

	circleStyles: React.PropTypes.shape({
		onColor: React.PropTypes.string,
		offColor: React.PropTypes.string,
		diameter: React.PropTypes.number
	}),

	inactive: React.PropTypes.bool,

	labels: React.PropTypes.shape({
		on: React.PropTypes.string,
		off: React.PropTypes.string
	}),

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
	switchStyles: defaultSwitchStyles,
	labels: { active: '', inactive: '' }
};

export default Switch;
