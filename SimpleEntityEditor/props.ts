'use strict';

import * as React from 'react';
import {_CommonFields} from './commons';
import {FilledInputProps} from '@material-ui/core/FilledInput';

/* Interfaces and types defined here are expected to be exported individually and separately. */

export interface IInputDom {
	id: string;
	value: any;
}

// As the field wrapper
export interface IEntityFieldWrapper extends _CommonFields.IFieldProps {
	onBlur?: React.EventHandler<any>;
	onFocus?: React.EventHandler<any>;
	InputProps?: Partial<FilledInputProps>;

	onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
}

export interface IInputFieldProps extends IEntityFieldWrapper, _CommonFields.IText {
}

export interface ISwitchFieldProps extends IEntityFieldWrapper, _CommonFields.ISwitch {
}

export interface ICheckboxFieldProps extends IEntityFieldWrapper, _CommonFields.ICheckbox {
}

// 下拉框、单选框
export interface ISingleSelectorFieldProps extends IEntityFieldWrapper, _CommonFields.ISingleSelector {
	value: string;
	values: _CommonFields.ISelectorItem[];
}

// Options for grouped checkbox.
export interface IMultipleSelectorFieldProps extends IEntityFieldWrapper, _CommonFields.IMultipleSelector {
	// 当前选择的值
	value?: string[];
	// 所有的待选项
	values: _CommonFields.ISelectorItem[];
}

// 下拉框、单选框
export interface ISuggestionFieldProps extends IEntityFieldWrapper, _CommonFields.ITextWithSuggestions {
}

export type IFieldProps = IInputFieldProps | ISwitchFieldProps | ICheckboxFieldProps | IMultipleSelectorFieldProps | ISingleSelectorFieldProps | ISuggestionFieldProps
