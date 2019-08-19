'use strict';

import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

interface IProps {
	title: string,
	domExitButton?: React.ReactNode,
}

export const MuiDialogTitleBar = React.memo((props: IProps) => {
	const {title, domExitButton} = props;
	return (
		<MuiDialogTitle disableTypography>
			<Typography variant="h6">{title}</Typography>
			{domExitButton}
		</MuiDialogTitle>
	);
});

