'use strict';

import {_CommonFields} from './commons';

/* Interfaces and types defined here are expected to be exported individually and separately. */


// The environment is only used by definitions.
export interface IEnvironment {
	isCreating: boolean;
	// The updated entity.
	entity: any;
	// The errors of fields if any.
	// The patch is not ready yet if it is not empty!
	errorTexts: string[];
}

export interface ISelectorItem {
	label: string;
	value: string;
}

// Define fields and get corresponding implementations by #SimpleEntityEditor.
// export type IFieldType = string | number | password | switch | checkbox | radio | selector | checkboxes | suggestions
// export type IFieldType = IFieldTypeText | IFieldTypeSwitch | IFieldTypeCheckbox | IFieldTypeSingleSelector | IFieldTypeMultipleSelector | IFieldTypeTextWithSuggestions
interface IBaseFieldDefinition extends _CommonFields.IFieldProps {
	_session_id?: string | number,
	default?: string;

	getLabel?: (env?: IEnvironment, field?: IFieldDefinition, value?: string) => string;
	getPlaceholder?: (env?: IEnvironment, field?: IFieldDefinition, value?: string) => string;
	getHelperText?: (env?: IEnvironment, field?: IFieldDefinition, value?: string) => string;
	// Not every field should be checked, even as not empty.
	getErrorText?: (value?: any, env?: IEnvironment, field?: IFieldDefinition) => string | undefined;
}

export interface IInputFieldDefinition extends IBaseFieldDefinition, _CommonFields.IText {
}

export interface ISwitchFieldDefinition extends IBaseFieldDefinition, _CommonFields.ISwitch {
}

export interface ICheckboxFieldDefinition extends IBaseFieldDefinition, _CommonFields.ICheckbox {
}

// 下拉框、单选框
export interface ISingleSelectorFieldDefinition extends IBaseFieldDefinition, _CommonFields.ISingleSelector {
}

// Options for grouped checkbox.
export interface IMultipleSelectorFieldDefinition extends IBaseFieldDefinition, _CommonFields.IMultipleSelector {
}

// 下拉框、单选框
export interface ISuggestionFieldDefinition extends IBaseFieldDefinition, _CommonFields.ITextWithSuggestions {
}

export type IFieldDefinition = IInputFieldDefinition | ISwitchFieldDefinition | ICheckboxFieldDefinition | IMultipleSelectorFieldDefinition | ISingleSelectorFieldDefinition | ISuggestionFieldDefinition
