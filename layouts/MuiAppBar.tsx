/**
 * Created by fisher at 3:53 PM on 10/15/17.
 */

'use strict';

import React from 'react';
import {AppBar} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

interface IProps {
	leftDom?: React.ReactNode,
	rightDom?: React.ReactNode,
	title: string,
}

/**
 * The AppBar of the application.
 *
 * Which should have only a left dom and right dom.
 */
export const MuiAppBar = React.memo<IProps>((props: IProps) => {
	const {title, leftDom, rightDom} = props;
	return (
		<AppBar position='static'>
			<Toolbar>
				{leftDom}
				<Typography variant="h6" color="inherit" style={{flex: 1}}>{title}</Typography>
				{rightDom}
			</Toolbar>
		</AppBar>
	);
});
