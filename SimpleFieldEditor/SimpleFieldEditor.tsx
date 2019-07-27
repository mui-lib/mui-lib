'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {AdvancedTextField} from '../AdvancedTextField/AdvancedTextField';

// A field editor which wraps a #AdvancedTextField and works like a #TextField but more powerful.
class SimpleFieldEditor extends React.Component {
	render() {
		const env = {};
		const field = this.props;
		const {value} = field;
		let {getLabel, getPlaceholder, getHelperText, getErrorText, ...props} = field;
		// The label, placeholder, and helperText are usually not dynamic.
		if (getLabel) {props.label = getLabel(env, field, value);}
		if (getPlaceholder) {props.placeholder = getPlaceholder(env, field, value);}
		if (getHelperText) {props.helperText = getHelperText(value, env, field);}
		// The errorText is often dynamic.
		if (getErrorText) {props.errorText = getErrorText(value, env, field);}
		return (
			<AdvancedTextField {...props}/>
		);
	}
}

SimpleFieldEditor.propTypes = {
	// @see #AdvancedTextField.
	showHelperTextWhenNotFocusing: PropTypes.bool,
	showErrorTextWhenFocusing: PropTypes.bool,
};

export default SimpleFieldEditor;
