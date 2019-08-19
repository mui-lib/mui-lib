'use strict';

import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import {IBaseDialogDefinition, IUpsertDialogDefinition} from './definitions';
import {IResolvedDialogProps, IResolvedUpsertDialogDefinition} from './props';

export interface IDialogEnvironment {
	isCreating: boolean;
}

export const getResolvedOptions = ({isCreating}: IDialogEnvironment, definition: IBaseDialogDefinition): IResolvedDialogProps => {
	const {title, getTitle, description, getDescription, domDescription, ...def} = definition;
	const domContentDescription = domDescription ? domDescription : (
		getDescription || description ? (<DialogContentText>{getDescription ? getDescription(isCreating) : description}</DialogContentText>) : undefined
	);
	return {
		...def,
		useTitleBar: def.fullScreen ? true : def.useTitleBar,
		useExitIcon: def.fullScreen ? true : def.useExitIcon,
		title: getTitle ? getTitle(isCreating) : title || 'Dialog Title',
		domDescription: domContentDescription,
	};
};

export const getResolvedUpsertOptions = (env: IDialogEnvironment, definition: IUpsertDialogDefinition): IResolvedUpsertDialogDefinition => {
	const {labelUpsertButton, getUpsertButtonLabel, labelDeleteButton, ...def} = definition;
	return {
		// WARNING MAY BE TRIGGERED WHEN EXTRA PROPS ARE MERGED.
		...getResolvedOptions(env, def),
		labelDeleteButton: labelDeleteButton,
		labelUpsertButton: getUpsertButtonLabel ? getUpsertButtonLabel(env.isCreating) : labelUpsertButton || 'Commit',
	};
};
