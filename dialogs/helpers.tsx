'use strict';

import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import {IBaseDialogDefinition, IConfirmDialogDefinition, IUpsertDialogDefinition} from './definitions';
import {IResolvedConfirmDialogProps, IResolvedDialogProps, IResolvedUpsertDialogProps} from './props';

export const getResolvedBasicOptions = (definition: IBaseDialogDefinition): IResolvedDialogProps => {
	const {description, domDescription, ...def} = definition;
	const domContentDescription = domDescription ? domDescription : (
		description ? (<DialogContentText>{description}</DialogContentText>) : undefined
	);
	return {
		...def,
		useTitleBar: def.fullScreen ? true : def.useTitleBar,
		useExitIcon: def.fullScreen ? true : def.useExitIcon,
		domDescription: domContentDescription,
	};
};


export interface IDialogEnvironment {
	isCreating: boolean;
}

export const getResolvedUpsertOptions = ({isCreating}: IDialogEnvironment, definition: IUpsertDialogDefinition): IResolvedUpsertDialogProps => {
	const {title, getTitle, description, getDescription, domDescription, labelUpsertButton, getUpsertButtonLabel, labelDeleteButton, ...def} = definition;
	const domContentDescription = domDescription ? domDescription : (
		getDescription || description ? (<DialogContentText>{getDescription ? getDescription(isCreating) : description}</DialogContentText>) : undefined
	);
	return {
		...def,
		useTitleBar: def.fullScreen ? true : def.useTitleBar,
		useExitIcon: def.fullScreen ? true : def.useExitIcon,
		title: getTitle ? getTitle(isCreating) : title || 'Dialog Title',
		domDescription: domContentDescription,
		labelDeleteButton: labelDeleteButton,
		labelUpsertButton: getUpsertButtonLabel ? getUpsertButtonLabel(isCreating) : labelUpsertButton || 'Commit',
	};
};

export const getResolvedConfirmationOptions = (definition: IConfirmDialogDefinition): IResolvedConfirmDialogProps => {
	const {labelConfirmButton, labelCancelButton, ...def} = definition;
	return {
		// WARNING MAY BE TRIGGERED WHEN EXTRA PROPS ARE MERGED.
		...getResolvedBasicOptions(def),
		labelConfirmButton,
		labelCancelButton,
	};
};
