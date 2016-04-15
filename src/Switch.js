import React from 'react';

class Switch extends React.Component {

	constructor(props) {
		super(props);

		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

		const onOff = !!this.props.on ? true : false;
		this.state = { dragging: false, on: onOff };
	}

	componentDidMount() {
		document.addEventListener('mouseup', this.onMouseUp, false);
		document.addEventListener('mousedown', this.onMouseDown, false);
	}

	componentWillUnmount() {
		document.removeEventListener('mouseup', this.onMouseUp, false);
		document.removeEventListener('mousedown', this.onMouseDown, false);
	}

	onMouseUp() {
		if (this.state.dragging) {
			this.setState({ dragging: false, on: !this.state.on });

			const newState = !this.state.on;
			const callback = newState ? this.props.switchOn : this.props.switchOff;
			callback && callback();
		}
	}

	onMouseDown(e) {
		if (e.target == this.refs.circle || e.target == this.refs.switch) {
			this.setState({ dragging: true });
		}
	}

	onMouseLeave(e) {
		this.onMouseUp(e);
	}

	classes() {
		return [
			'switch',
			this.state.dragging ? 'dragging' : '',
			this.state.on ? 'on' : 'off'
		].join(' ');
	}

	styles() {
		return Object.assign({
			borderRadius: switchStyles.width / 2,
		}, switchStyles);
	}

	circleStyles() {
		const switchStyles = this.styles();

		let translation = this.state.on ? (switchStyles.width - circleStyles.height) : 0;
		const backgroundColor = this.state.on ? circleStyles.onColor : circleStyles.offColor;
		const width = this.state.dragging ? (circleStyles.height + circleStyles.height / 2)  : circleStyles.height;

		if (this.state.dragging && this.state.on) {
			translation -= (circleStyles.height / 2 + switchStyles.padding);
		}

		return Object.assign({
			transform: `translateX(${translation}px)`,
			backgroundColor,
			width
		}, circleStyles);
	}

	render() {
		return (
			<div style={this.styles()} className={this.classes()} ref="switch" onMouseLeave={this.onMouseLeave}>
				<span style={this.circleStyles()} className="circle" ref="circle"></span>
			</div>
		);
	}
}

const switchStyles = {
	width: 100,
	backgroundColor: 'white',
	padding: 4,
	border: '1px solid gray'
};

const circleStyles = {
	height: 35,
	borderRadius: 35,
	display: 'block',
	transition: 'transform 200ms, width 200ms, background-color 200ms',
	onColor: '#70D600',
	offColor: '#CFCFCF'
};

Switch.propTypes = {
	off: React.PropTypes.bool,
	on: React.PropTypes.bool,
	switchOff: React.PropTypes.func,
	switchOn: React.PropTypes.func
};

export default Switch;
