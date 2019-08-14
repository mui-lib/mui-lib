'use strict';


import {IInputFieldDefinition} from '../SimpleEntityEditor/definitions';
import {FieldAutoCompleteOff, FieldMarginDense, FieldTypeString} from '../SimpleEntityEditor/instances';

export const R = {
	getSubmitButtonLabel: (isCreating: boolean) => isCreating ? 'Create' : 'Save Changes',
};

export const RAccount = {
	getDialogTitle: (isCreating: boolean) => isCreating ? 'Create Account' : 'Update Profile',
	getSubmitButtonLabel: (isCreating: boolean) => isCreating ? 'Create' : 'Save Changes',
};

const defaultOptions = {
	required: true,
	fullWidth: true,
	margin: FieldMarginDense,
	type: FieldTypeString,
	multiline: false,
	autoComplete: FieldAutoCompleteOff,
};


const fieldName: IInputFieldDefinition = {
	...defaultOptions,
	id: 'name',
	label: 'Name',
	placeholder: 'what will be your name?',
	required: true,
	getErrorText: (value: string) => value && value.length < 2 ? 'Please give a valid name!' : undefined,
};

const fieldMajor: IInputFieldDefinition = {
	...defaultOptions,
	id: 'major',
	label: 'Major',
	placeholder: 'What is your major?',
	getErrorText: (value: string) => value && value.length < 2 ? 'Please give a valid major!' : undefined,
};

const fieldEmail: IInputFieldDefinition = {
	...defaultOptions,
	id: 'email',
	label: 'Email',
	placeholder: 'what is your email?',
	getErrorText: (value: string) => value && !value.includes('@') ? 'Please give a valid email!' : undefined,
};

export const fields = {
	name: fieldName,
	email: fieldEmail,
	major: fieldMajor,
};
