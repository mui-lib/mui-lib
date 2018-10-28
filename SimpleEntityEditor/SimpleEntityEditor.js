'use strict';

import React from 'react';
import PropTypes from 'prop-types';

// A custom entity editor/form consisting of configurable components for entity fields, which calls the
// props#onPatchChange() with the latest #entityPatch when any field is going to be updated.
//
// Think about whether to extend #PureComponent or not, and currently use #PureComponent(performance, logically correctness).
class SimpleEntityEditor extends React.PureComponent {
	onValueChange = ({target: {id, name, value}} = {}) => {
		if (!id) {console.warn(`The id of target is empty, id: [${id}]; name: [${name}].`);}
		if (!id) {id = name;}
		const {onPatchChange, targetEntity, entityPatch} = this.props;
		if (targetEntity[id] === value) {
			delete entityPatch[id];
		} else {
			entityPatch[id] = value;
		}
		// Here the #entityPatch is not reconstructed, and hence the user will be responsible for it.
		onPatchChange(entityPatch);
	};

	renderField = (field, value, env) => {
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
		let FieldEditor;
		// switch (props.type) {
		// 	case 'string':
		// 	case 'number':
		if (props.suggestions) {
			FieldEditor = this.props.TextFieldWithSuggestions;
			if (!FieldEditor) {console.warn('The expected #TextFieldWithSuggestions is not loaded!');}
		} else if (props.values) {
			FieldEditor = this.props.Selector;
			if (!FieldEditor) {console.warn('The expected #Selector is not loaded!');}
		} else {
			FieldEditor = this.props.TextField;
			if (!FieldEditor) {console.warn('The expected #TextField is not loaded!');}
		}
		// break;
		// }
		const UsedFieldEditor = FieldEditor || this.props.TextField;
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
		const updatedEntity = entityPatch ? {...targetEntity, ...entityPatch} : {...targetEntity};
		const isCreating = Boolean(targetEntity._id) || Boolean(targetEntity.id);
		const env = {
			isCreating: isCreating,
			// The updated entity.
			entity: updatedEntity,
		};
		return entityFields.map(field => this.renderField(field, updatedEntity[field.id], env));
	}
}

SimpleEntityEditor.propTypes = {
	onPatchChange: PropTypes.func.isRequired,
	// Fields of the entity that to be handled.
	entityFields: PropTypes.array.isRequired,
	TextField: PropTypes.func,
	Selector: PropTypes.func,
	TextFieldWithSuggestions: PropTypes.func,
	// The expected action is updating an entity if the targetEntity._id or targetEntity.id is set.
	targetEntity: PropTypes.object.isRequired,
	entityPatch: PropTypes.object,
};

export default SimpleEntityEditor;
