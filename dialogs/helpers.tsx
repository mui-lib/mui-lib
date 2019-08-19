'use strict';

import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import {IBaseDialogDefinition} from 'src/mui-lib/dialogs/definitions';
import {IResolvedDialogProps} from 'src/mui-lib/dialogs/props';

export interface IDialogEnvironment {
	isCreating: boolean;
}

export const getResolvedOptions = ({isCreating}: IDialogEnvironment, definition: IBaseDialogDefinition): IResolvedDialogProps => {
	const {title, getTitle, description, domDescription, ...def} = definition;
	const domContentDescription = domDescription ? domDescription : (
		description ? (<DialogContentText>{description}</DialogContentText>) : undefined
	);
	return {
		...def,
		useTitleBar: def.fullScreen ? true : def.useTitleBar,
		useExitIcon: def.fullScreen ? true : def.useExitIcon,
		title: getTitle ? getTitle(isCreating) : title || 'Dialog Title',
		domDescription: domContentDescription,
	};
};
