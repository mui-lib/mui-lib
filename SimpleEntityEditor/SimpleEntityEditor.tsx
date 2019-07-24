'use strict';

import React from 'react';
import TextField from '@material-ui/core/TextField';
import {FilledInputProps} from '@material-ui/core/FilledInput';
import {FieldTypeCheckbox, FieldTypeSwitch} from './instances';

// import {FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps} from '@material-ui/core/TextField/TextField';

// Pass a different _session_id to reset states of the #AdvancedTextField which holds the state of the #edited status.
// Different sessions will be used for different target entities.
let _session_id = 1;

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

interface ITargetEntity {
	_id?: string | number;
	id?: string | number;
}

export interface IProps {
	_session_id?: string | number,
	onPatchChange: (patch: any) => void,
	// Fields of the entity that to be handled.
	entityFields: IFieldDefinition[],
	// - The component used for unspecified fields.
	// - The default component used when other components is not correctly loaded.
	TextField: React.ReactNode,
	Checkbox?: React.ReactNode,
	Switch?: React.ReactNode,
	Selector?: React.ReactNode,
	GroupedCheckboxes?: React.ReactNode,
	TextFieldWithSuggestions?: React.ReactNode,
	// The expected action is updating an entity if the targetEntity._id is set.
	targetEntity: ITargetEntity;
	// The patch object for the latest entity based on the target entity.
	entityPatch: object;
}

export interface IState {
	_session_id?: string | number,
	_target_entity: null,
}

// A custom entity editor/form consisting of configurable components for entity fields, which calls the
// props#onPatchChange() with the latest #entityPatch when any field is going to be updated.
//
// Think about whether to extend #PureComponent or not, and currently use #PureComponent(performance, logically correctness).
export class SimpleEntityEditor extends React.Component<IProps> {
	static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
		const {_target_entity} = prevState;
		const {targetEntity} = nextProps;
		if (_target_entity !== targetEntity) {
			// Generate a new session ID for the new #targetEntity.
			return {_session_id: _session_id++, _target_entity: targetEntity};
		}
		return null;
	}

	state: IState = {
		_session_id: _session_id,
		_target_entity: null,
	};

	onValueChange = ({target: {id, name, value, type, checked} = {} as any} = {}) => {
		if (!id) {
			if (!name) {
				console.error(`Both id and name of target are empty, id: [${id}]; name: [${name}].`);
				return;
			} else {
				id = name;
				console.warn(`The id of target is empty, id: [${id}] using target.name as the id: [${name}].`);
			}
		}
		if (type === FieldTypeSwitch || type === FieldTypeCheckbox) {value = checked;}
		const {onPatchChange, targetEntity, entityPatch} = this.props;
		if (targetEntity[id] === value) {
			delete entityPatch[id];
		} else {
			entityPatch[id] = value;
		}
		// Here the #entityPatch is not reconstructed, and hence the user will be responsible for it.
		onPatchChange(entityPatch);
	};

	renderField = (field: IFieldDefinition, value: string, env: IEnvironment, _session_id?: string | number) => {
		let {getLabel, getPlaceholder, getHelperText, getErrorText, default: _default, ...props} = field;
		const id = props.id;
		// The label, placeholder, and helperText are usually not dynamic.
		if (getLabel) {props.label = getLabel(env, field, value);}
		if (getPlaceholder) {props.placeholder = getPlaceholder(env, field, value);}
		if (getHelperText) {props.helperText = getHelperText(env, field, value);}
		// The errorText is often dynamic.
		if (getErrorText) {
			props.errorText = getErrorText(value, env, field);
		}
		// FIXME let FieldEditor: React.ReactNode = TextField;
		let FieldEditor: any = TextField;
		switch (props.type) {
			case 'string':
			case 'number':
			case 'password':
				FieldEditor = this.props.TextField;
				if (!FieldEditor) {console.warn('The needed #TextField is not loaded!');}
				break;
			case 'suggestions':
				FieldEditor = this.props.TextFieldWithSuggestions;
				if (!FieldEditor) {console.warn('The needed #TextFieldWithSuggestions is not loaded!');}
				break;
			case 'selector':
			case 'radio':
				FieldEditor = this.props.Selector;
				if (!FieldEditor) {console.warn('The expected #Selector is not loaded!');}
				break;
			case 'checkboxes':
			case 'checkbox':
				FieldEditor = this.props.Checkbox;
				if (!FieldEditor) {console.warn('The expected #Checkbox is not loaded!');}
				break;
			case 'switch':
				FieldEditor = this.props.Switch;
				if (!FieldEditor) {console.warn('The expected #Switch is not loaded!');}
				break;
			default:
				FieldEditor = this.props.TextField;
				if (!FieldEditor) {console.warn('The expected #TextField is not loaded!');}
				break;
		}
		if (!FieldEditor) {FieldEditor = this.props.TextField;}
		const UsedFieldEditor = FieldEditor || this.props.TextField || TextField;
		// FIX-ME Support the _session_id support checking for #TypeScript components.
		// Pass the _session_id if the used component desires.
		if (UsedFieldEditor.propTypes && UsedFieldEditor.propTypes._session_id) {props._session_id = _session_id;}
		// FIX-ME Currently delete props.type to fix the issue where the height of multi-lined #Text-Field is not flexible.
		if (props.type && props.multiline) {delete props.type;}
		return (
			<UsedFieldEditor
				key={id}
				{...props}
				value={value || _default || ''}
				onChange={this.onValueChange}
			/>
		);
	};

	render() {
		const {entityFields, targetEntity = {}, entityPatch = {}} = this.props;
		const {_session_id} = this.state;
		const updatedEntity = entityPatch ? {...targetEntity, ...entityPatch} : {...targetEntity};
		const isCreating = Boolean(targetEntity._id) || Boolean(targetEntity.id);
		const env: IEnvironment = {
			isCreating: isCreating,
			// The updated entity.
			entity: updatedEntity,
		};
		return entityFields.map((field: IFieldDefinition) => this.renderField(field, updatedEntity[field.id], env, _session_id));
	}
}
