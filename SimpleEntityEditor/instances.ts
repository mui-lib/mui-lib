'use strict';

import {IFieldAutoComplete, IFieldMargin, IFieldTypeCheckbox, IFieldTypeMultipleSelector, IFieldTypeSingleSelector, IFieldTypeSwitch, IFieldTypeText, IFieldTypeTextWithSuggestions} from './SimpleEntityEditor';

/* Kinds of constant instances. */

// Instances of supported field types.
export const FieldTypeString: IFieldTypeText = 'string';
export const FieldTypeNumber: IFieldTypeText = 'number';
export const FieldTypePassword: IFieldTypeText = 'password';
export const FieldTypeSwitch: IFieldTypeSwitch = 'switch';
export const FieldTypeCheckbox: IFieldTypeCheckbox = 'checkbox';
export const FieldTypeRadio: IFieldTypeSingleSelector = 'radio';
export const FieldTypeSelector: IFieldTypeSingleSelector = 'selector';
export const FieldTypeGroupedCheckboxes: IFieldTypeMultipleSelector = 'checkboxes';
export const FieldTypeTextWithSuggestions: IFieldTypeTextWithSuggestions = 'suggestions';

// Instances of some supported field props.
export const FieldMarginDense: IFieldMargin = 'dense';
export const FieldAutoCompleteOff: IFieldAutoComplete = 'off';
