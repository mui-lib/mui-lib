'use strict';

import React, {useEffect, useState} from 'react';

// Use 999 milliseconds as 1 second for rendering and other operations may slow it down.
const timeout = 999;

interface IProps {
	seconds: number;
}

// A simple #Countdown by seconds.
const TheCountdownBySeconds = (props: IProps) => {
	const [seconds, setState] = useState(props.seconds || 5);
	// console.log('seconds:', seconds);

	// Executed on seconds changed.
	// Register a new timer and prepare the cleanup.
	// OR Think about follow the rule to clean the latest timer if any.
	useEffect(() => {
		const mTimer = setTimeout(doCountDown, timeout);
		// console.log('mTimer set >:', mTimer);
		return () => {
			// console.log('cleaning up >', mTimer);
			if (mTimer) {clearTimeout(mTimer);}
		};
	}, [seconds]);

	const doCountDown = () => {
		if (seconds <= 0) {return;}
		setState(seconds - 1);
	};

	return (
		<span>{seconds}</span>
	);
};

export const CountdownBySeconds: React.FC<IProps> = React.memo<IProps>(TheCountdownBySeconds);
