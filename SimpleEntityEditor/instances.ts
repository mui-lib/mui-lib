'use strict';

import {_CommonFields} from './commons';

/* Kinds of constant instances. */

// Instances of supported field types.
export const FieldTypeString: _CommonFields.IFieldTypeText = 'string';
export const FieldTypeNumber: _CommonFields.IFieldTypeText = 'number';
export const FieldTypePassword: _CommonFields.IFieldTypeText = 'password';
export const FieldTypeSwitch: _CommonFields.IFieldTypeSwitch = 'switch';
export const FieldTypeCheckbox: _CommonFields.IFieldTypeCheckbox = 'checkbox';
export const FieldTypeRadio: _CommonFields.IFieldTypeSingleSelector = 'radio';
export const FieldTypeSelector: _CommonFields.IFieldTypeSingleSelector = 'selector';
export const FieldTypeGroupedCheckboxes: _CommonFields.IFieldTypeMultipleSelector = 'checkboxes';
export const FieldTypeTextWithSuggestions: _CommonFields.IFieldTypeTextWithSuggestions = 'suggestions';

// Instances of some supported field props.
export const FieldMarginDense: _CommonFields.IFieldMargin = 'dense';
export const FieldAutoCompleteOff: _CommonFields.IFieldAutoComplete = 'off';

export const FieldGroupFlexDirectionRow: _CommonFields.IFieldGroupFlexDirection = 'row';
export const FieldGroupFlexDirectionColumn: _CommonFields.IFieldGroupFlexDirection = 'column';
