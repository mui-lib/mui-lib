//

import {GetUpsertString, IConfirmDialogDefinition, IUpsertDialogDefinition} from './definitions';

// Editor
const UpsertDialogConfigures = {
	useTitleBar: true,
	useExitIcon: true,
	minWidth: '320px',
};

// Call this method on the entrance of your app to apply your options.
const setUpsertDialogConfigures = ({useTitleBar, useExitIcon, minWidth}: Partial<typeof UpsertDialogConfigures>) => {
	const conf = ConfirmationDialogConfigures;
	if (useTitleBar !== undefined) {conf.useTitleBar = useTitleBar;}
	if (useExitIcon !== undefined) {conf.useExitIcon = useExitIcon;}
	if (minWidth !== undefined) {conf.minWidth = minWidth;}
};

const getUpsertDialogOptions = (fullScreen: boolean, getTitle: GetUpsertString, getUpsertButtonLabel: GetUpsertString, getDescription: GetUpsertString, labelDeleteButton?: string): IUpsertDialogDefinition => ({
	...UpsertDialogConfigures,
	fullScreen: fullScreen,
	getTitle, getDescription, getUpsertButtonLabel, labelDeleteButton,
});

const getUpsertDialogOptionsByValues = (fullScreen: boolean, title: string, getUpsertButtonLabel: GetUpsertString, description?: string, labelDeleteButton?: string): IUpsertDialogDefinition => ({
	...UpsertDialogConfigures,
	fullScreen: fullScreen,
	title, description, getUpsertButtonLabel, labelDeleteButton,
});

const ConfirmationDialogConfigures = {
	useTitleBar: true,
	useExitIcon: false,
	minWidth: '280px',
};

// Call this method on the entrance of your app to apply your options.
const setConfirmationDialogConfigures = ({useTitleBar, useExitIcon, minWidth}: Partial<typeof ConfirmationDialogConfigures>) => {
	const conf = ConfirmationDialogConfigures;
	if (useTitleBar !== undefined) {conf.useTitleBar = useTitleBar;}
	if (useExitIcon !== undefined) {conf.useExitIcon = useExitIcon;}
	if (minWidth !== undefined) {conf.minWidth = minWidth;}
};

const getConfirmDialogOptions = (title: string, labelConfirmButton: string, labelCancelButton?: string, description?: string): IConfirmDialogDefinition => ({
	...ConfirmationDialogConfigures,
	title, description,
	labelConfirmButton, labelCancelButton,
});

export const DialogConfigures = {
	getUpsertDialogOptions,
	getUpsertDialogOptionsByValues,
	setUpsertDialogConfigures,

	getConfirmDialogOptions,
	setConfirmationDialogConfigures,
};