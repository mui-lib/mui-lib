'use strict';

import React from 'react';
import {useStyles} from './styles';

interface ISectionProps {
	title: string;
	children: React.ReactNode;
}

export const DemoSection = React.memo((props: ISectionProps) => {
	const classes = useStyles();
	const {title, children} = props;
	return (
		<div className={classes.sectionBox}>
			<h3 className={classes.sectionTitle}>{title}</h3>
			{children}
		</div>
	);
});
