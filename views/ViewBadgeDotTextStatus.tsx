//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const size = 6;
const useStyles = makeStyles({
	ctn: {display: 'inline-flex', alignItems: 'center', justifyContent: 'center'},
	dot: {width: size, height: size, margin: '0 5px', borderRadius: '50%'},
});

export type IStatus = 'success' | 'warning' | 'error' | 'default' | 'processing'

interface IProps {
	status?: IStatus;
	color?: string;
	text?: string;
}

const getColor = (status?: IStatus): string => {
	switch (status) {
		case 'success':
			return 'green';
		case 'processing':
			return 'blue';
		case 'warning':
			return 'orange';
		case 'error':
			return '#c00';
		case 'default':
		default:
			return status || 'gray';
	}
};

// A dot/text view representing a kind of status for something.
// @see https://ant.design/components/badge
export const ViewBadgeDotTextStatus = React.memo<IProps>(({status, color, text}) => {
	const cls = useStyles();

	if (!color) {color = getColor(status);}

	return text ? (
		<div className={cls.ctn} style={{color}}>
			<div className={cls.dot} style={{background: color}}/>
			{text}
		</div>
	) : (
		<div className={cls.dot} style={{background: color}}/>
	);
});
