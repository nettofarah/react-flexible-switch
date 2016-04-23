import React from 'react';
import { merge } from './utils';

export default class Label extends React.Component {

	styles() {
		const offset = this.props.active ? { left: '20% '} : { right: '20%' };

		return merge({
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
			pointerEvents: 'none',
		}, offset);
	}

	render() {
		return (
			<span style={this.styles()} className="label">
				{this.props.active ? this.props.labels.on : this.props.labels.off }
			</span>
		);
	}
}


Label.propTypes = {
	active: React.PropTypes.bool,
	labels: React.PropTypes.shape({
		on: React.PropTypes.string,
		off: React.PropTypes.string
	})
};
