'use strict';

import React from 'react';
import PropTypes from 'prop-types';

// Use 999 milliseconds as 1 second for rendering and other operations may slow it down.
const timeout = 999;

// A simple #Countdown by seconds.
class CountdownBySeconds extends React.Component {
	state = {
		seconds: props.seconds || 5,
	};

	componentWillMount() {
		this.mTimer = setTimeout(this.doCountDown, timeout);
	}

	componentWillUnmount() {
		if (this.mTimer) {clearTimeout(this.mTimer);}
	}

	doCountDown = () => {
		const {seconds} = this.state;
		if (this.mTimer) {clearTimeout(this.mTimer);}
		if (seconds <= 0) {return;}
		this.setState({
			seconds: seconds - 1
		});
		this.mTimer = setTimeout(this.doCountDown, timeout);
	};

	render() {
		const {seconds} = this.state;
		return (
			<span>{seconds}</span>
		);
	}
}

CountdownBySeconds.propTypes = {
	seconds: PropTypes.number.isRequired,
};

export default CountdownBySeconds;
