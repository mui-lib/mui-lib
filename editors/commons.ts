'use strict';

import * as React from 'react';

/* Interfaces and types defined here are expected to be exported silently. */

// The shared interfaces used by props and definitions.
export namespace _CommonFields {
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
	export type IFieldGroupFlexDirection = 'row' | 'column';
	export type IFieldVariant = 'standard' | 'outlined' | 'filled';

	// As an field of a group of fields(an entity), which works for custom components/wrappers overriding the given components by #mui, like #AdvancedTextField, #TextFieldWithSuggestions, #Selectors, #GroupedCheckboxes, #GroupedRadios, and etc.
	export interface IFieldProps {
		id: string;
		label: string;
		variant?: IFieldVariant;
		// type?: IFieldType;
		placeholder?: string;
		multiline?: boolean;
		style?: React.CSSProperties;

		fullWidth?: boolean;
		margin?: IFieldMargin;
		autoComplete?: IFieldAutoComplete;

		required?: boolean;
		helperText?: string;
		errorText?: string;

		// 提示输入
		suggestions?: any;
	}

	// Shared by definitions and props.
	export interface ISelectorItem {
		label: string;
		value: string;
	}

	export interface IText {
		type: IFieldTypeText;
		noDefaultHelperText?: boolean;
	}

	export interface ISwitch {
		type: IFieldTypeSwitch;
	}

	export interface ICheckbox {
		type: IFieldTypeCheckbox;
	}

	export interface ISingleSelector {
		type: IFieldTypeSingleSelector;
		values?: ISelectorItem[];
		direction?: _CommonFields.IFieldGroupFlexDirection;
	}

	export interface IMultipleSelector {
		type: IFieldTypeMultipleSelector;
		// 多项选择框(勾选框)
		values?: ISelectorItem[];
		minimum?: number;
		minimumErrorText?: string;
		maximum?: number;
		maximumErrorText?: string;
		direction?: _CommonFields.IFieldGroupFlexDirection;
	}

	export interface ITextWithSuggestions {
		type: IFieldTypeTextWithSuggestions;
	}
}


