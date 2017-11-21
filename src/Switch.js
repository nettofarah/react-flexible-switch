import React from 'react';
import classNames from 'classnames';
import Label from './Label';
import { merge, events, disableScroll, reEnableScroll } from './utils';
import PropTypes from 'prop-types'

class Switch extends React.Component {

  constructor(props) {
    super(props);

    this.onActivateButton = this.onActivateButton.bind(this);
    this.onSlideEnd = this.onSlideEnd.bind(this);
    this.onSlideStart = this.onSlideStart.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.isTouchDevice = window['ontouchstart'] !== undefined;

    this.state = { sliding: false, value: this.props.value };
  }

  componentDidMount() {
    this.addListener();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === undefined) {
      return;
    }

    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value != prevState.value) {
      this.props.onChange(this.state.value);
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  addListener() {
    if (this.isTouchDevice) {
      document.addEventListener(events.touch.start, this.onSlideStart, false);
      document.addEventListener(events.touch.stop, this.onSlideEnd, false);
    } else {
      document.addEventListener(events.mouse.start, this.onSlideStart, false);
      document.addEventListener(events.mouse.stop, this.onSlideEnd, false);
    }
  }

  removeListener() {
    if (this.isTouchDevice) {
      document.removeEventListener(events.touch.start, this.onSlideStart, false);
      document.removeEventListener(events.touch.stop, this.onSlideEnd, false);
    } else {
      document.removeEventListener(events.mouse.start, this.onSlideStart, false);
      document.removeEventListener(events.mouse.stop, this.onSlideEnd, false);
    }
  }

  onActivateButton() {
    this.setState({ value: !this.state.value });
  }

  onSlideEnd() {
    if (this.props.locked) {
      return;
    }

    if (this.state.sliding) {
      this.setState({ sliding: false, value: !this.state.value });
      reEnableScroll();
    }
  }

  onSlideStart(e) {
    if (this.props.locked) {
      return;
    }

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
      'react-flexible-switch',
      { 'react-flexible-switch--sliding': this.state.sliding },
      { 'react-flexible-switch--active': this.state.value },
      { 'react-flexible-switch--inactive': !this.state.value }
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
    let translation = this.state.value ? offset : 0;

    if (this.state.sliding && this.state.value) {
      translation -= (circleStyles.diameter / 4 + switchStyles.padding / 4);
    }

    return {
      transform: `translateX(${translation}px)`
    };
  }

  backgroundStyle() {
    const circleStyles = this.circleStylesProps();
    const backgroundColor = this.state.value ? circleStyles.onColor : circleStyles.offColor;
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

        <Label active={this.state.value} labels={this.props.labels} ref="label" />
        <span style={this.circleStyles()} className="react-flexible-switch-circle" ref="circle" />

        <button
          disabled={this.props.locked}
          onClick={this.onActivateButton}
          style={hiddenButtonStyles}
          type="button"
          ref="button"
        />
      </span>
    );
  }
}

const defaultSwitchStyles = {
  width: 80,
  padding: 4,
  border: '1px solid #CFCFCF',
  display: 'flex',
  position: 'relative',
  backgroundColor: 'white',
  boxSizing: 'content-box'
};

const defaultCircleStyles = {
  diameter: 35,
  borderRadius: 35,
  display: 'block',
  transition: 'transform 200ms, width 200ms, background-color 200ms',
  onColor: '#70D600',
  offColor: '#CFCFCF'
};

const hiddenButtonStyles = {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  color: 'transparent',
  height: '100%',
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: '100%'
};

Switch.propTypes = {
  value: PropTypes.bool,

  circleStyles: PropTypes.shape({
    onColor: PropTypes.string,
    offColor: PropTypes.string,
    diameter: PropTypes.number
  }),

  labels: PropTypes.shape({
    on: PropTypes.string,
    off: PropTypes.string
  }),

  locked: PropTypes.bool,

  onChange: PropTypes.func,

  switchStyles: PropTypes.shape({
    width: PropTypes.number
  })
};

Switch.defaultProps = {
  onChange: (function() {}),
  circleStyles: defaultCircleStyles,
  switchStyles: defaultSwitchStyles,
  labels: { on: '', off: '' },
  locked: false
};

export default Switch;
