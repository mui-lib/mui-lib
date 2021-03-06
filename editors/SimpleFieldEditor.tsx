'use strict';

import React from 'react';
import {AdvancedTextField} from './AdvancedTextField';
import {IEnvironment, IInputFieldDefinition} from './definitions';
import {IInputFieldProps} from './props';

interface IProps extends IInputFieldDefinition, IInputFieldProps {
	// @see #AdvancedTextField.
	showHelperTextWhenNotFocusing?: boolean;
	showErrorTextWhenFocusing?: boolean;
	value: string
}

// A field editor which wraps a #AdvancedTextField and works like a #TextField but more powerful.
export const TheSimpleFieldEditor = (props: IProps) => {
	const env: IEnvironment = {isCreating: true, entity: props, errorTexts: []};
	const field = props;
	const {value} = props;
	let {getLabel, getPlaceholder, getHelperText, getErrorText, ...others} = props;
	// The label, placeholder, and helperText are usually not dynamic.
	// FIX-ME Remove the duplicated codes.
	if (getLabel) {others.label = getLabel(env, field, value);}
	if (getPlaceholder) {others.placeholder = getPlaceholder(env, field, value);}
	if (getHelperText) {others.helperText = getHelperText(env, field, value);}
	// The errorText is often dynamic.
	if (getErrorText) {
		others.errorText = getErrorText(value, env, field);
		if (others.errorText) {env.errorTexts.push(others.errorText);}
	}
	return (
		<AdvancedTextField {...others}/>
	);
};

export const SimpleFieldEditor: React.FC<IProps> = React.memo<IProps>(TheSimpleFieldEditor);
