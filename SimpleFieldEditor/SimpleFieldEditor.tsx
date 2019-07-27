'use strict';

import React from 'react';
import {AdvancedTextField} from '../AdvancedTextField/AdvancedTextField';
import {IEnvironment, IInputFieldDefinition} from '../SimpleEntityEditor/definitions';
import {IInputFieldProps} from '../SimpleEntityEditor/props';

interface IProps extends IInputFieldDefinition, IInputFieldProps {
	// @see #AdvancedTextField.
	showHelperTextWhenNotFocusing?: boolean;
	showErrorTextWhenFocusing?: boolean;
	value: string
}

// A field editor which wraps a #AdvancedTextField and works like a #TextField but more powerful.
export const TheSimpleFieldEditor = (props: IProps) => {
	const env: IEnvironment = {isCreating: true, entity: props};
	const field = props;
	const {value} = props;
	let {getLabel, getPlaceholder, getHelperText, getErrorText, ...others} = props;
	// The label, placeholder, and helperText are usually not dynamic.
	if (getLabel) {others.label = getLabel(env, field, value);}
	if (getPlaceholder) {others.placeholder = getPlaceholder(env, field, value);}
	if (getHelperText) {others.helperText = getHelperText(env, field, value);}
	// The errorText is often dynamic.
	if (getErrorText) {others.errorText = getErrorText(value, env, field);}
	return (
		<AdvancedTextField {...others}/>
	);
};

export const SimpleFieldEditor: React.FC<IProps> = React.memo<IProps>(TheSimpleFieldEditor);
