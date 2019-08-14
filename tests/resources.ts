'use strict';


import {IInputFieldDefinition} from '../SimpleEntityEditor/definitions';
import {FieldAutoCompleteOff, FieldMarginDense, FieldTypeString} from '../SimpleEntityEditor/instances';

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
	required: false,
	getErrorText: () => undefined,
};

const fieldEmail: IInputFieldDefinition = {
	...defaultOptions,
	id: 'email',
	label: 'Email',
	placeholder: 'what is your email?',
	getErrorText: (value: string) => !value ? undefined : (!value.includes('@') ? 'Please give a valid email!' : undefined),
};

export const fields = {
	name: fieldName,
	email: fieldEmail,
};
