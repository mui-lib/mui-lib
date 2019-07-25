'use strict';

import {FilledInputProps} from '@material-ui/core/FilledInput';

export interface IEnvironment {
	isCreating: boolean;
	// The updated entity.
	entity: any;
}

// Single and Simple Input Field
export type IFieldTypeText = 'string' | 'number' | 'password'
// A Checker/Switch
export type IFieldTypeSwitch = 'switch'
export type IFieldTypeCheckbox = 'checkbox'
// Single Selector
export type IFieldTypeSingleSelector = 'radio' | 'selector'
// Multiple Selector
export type IFieldTypeMultipleSelector = 'checkboxes'
// Input Field with Suggestions
export type IFieldTypeTextWithSuggestions = 'suggestions'
// export type IFieldType = string | number | password | switch | checkbox | radio | selector | checkboxes | suggestions
export type IFieldType = IFieldTypeText | IFieldTypeSwitch | IFieldTypeCheckbox | IFieldTypeSingleSelector | IFieldTypeMultipleSelector | IFieldTypeTextWithSuggestions
export type IFieldMargin = 'dense'
export type IFieldAutoComplete = 'off'

export interface ISelectorItem {
	label: string;
	value: string;
}

// As an field of a group of fields(an entity), which works for custom components/wrappers overriding the given components by #mui, like #AdvancedTextField, #TextFieldWithSuggestions, #Selectors, #GroupedCheckboxes, #GroupedRadios, and etc.
export interface ISharedFieldProps {
	id: string;
	label: string;
	type?: IFieldType;
	placeholder?: string;
	multiline?: boolean;

	fullWidth?: boolean;
	margin?: IFieldMargin;
	autoComplete?: IFieldAutoComplete;

	required?: boolean;
	helperText?: string;
	errorText?: string;

	// 提示输入
	suggestions?: any;
}

// As the field wrapper
export interface IEntityFieldWrapper extends ISharedFieldProps {
	onBlur?: React.EventHandler<any>;
	onFocus?: React.EventHandler<any>;
	InputProps?: Partial<FilledInputProps>;

	onChange: (event: { target: IInputDom }) => void;
}

// Define fields and get corresponding implementations by #SimpleEntityEditor.
// export type IFieldType = string | number | password | switch | checkbox | radio | selector | checkboxes | suggestions
// export type IFieldType = IFieldTypeText | IFieldTypeSwitch | IFieldTypeCheckbox | IFieldTypeSingleSelector | IFieldTypeMultipleSelector | IFieldTypeTextWithSuggestions
export interface IBaseFieldDefinition extends ISharedFieldProps {
	_session_id?: string | number,
	default?: string;

	getLabel?: (env?: IEnvironment, field?: IFieldDefinition, value?: string) => string;
	getPlaceholder?: (env?: IEnvironment, field?: IFieldDefinition, value?: string) => string;
	getHelperText?: (env?: IEnvironment, field?: IFieldDefinition, value?: string) => string;
	// Not every field should be checked, even as not empty.
	getErrorText?: (value?: any, env?: IEnvironment, field?: IFieldDefinition) => string | undefined;
}

export interface IInputFieldDefinition extends IBaseFieldDefinition {
	type: IFieldTypeText;
}

export interface ISwitchFieldDefinition extends IBaseFieldDefinition {
	type: IFieldTypeSwitch;
}

export interface ICheckboxFieldDefinition extends IBaseFieldDefinition {
	type: IFieldTypeCheckbox;
}

export interface ISingleSelectorFieldDefinition extends IBaseFieldDefinition {
	// 下拉框、单选框
	type: IFieldTypeSingleSelector;
	values?: ISelectorItem[];
}

// Options for grouped checkbox.
export interface IMultipleSelectorFieldDefinition extends IBaseFieldDefinition {
	type: IFieldTypeMultipleSelector;
	// 多项选择框(勾选框)
	values?: ISelectorItem[];
	minimum?: number;
	minimumErrorText?: string;
	maximum?: number;
	maximumErrorText?: string;
}

export interface ISuggestionFieldDefinition extends IBaseFieldDefinition {
	// 下拉框、单选框
	type: IFieldTypeTextWithSuggestions;
}

export type IFieldDefinition = IInputFieldDefinition | ISwitchFieldDefinition | ICheckboxFieldDefinition | IMultipleSelectorFieldDefinition | ISingleSelectorFieldDefinition | ISuggestionFieldDefinition

export interface IInputDom {
	id: string;
	name?: string;
	value: any;
}
