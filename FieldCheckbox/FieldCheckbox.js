'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class FieldCheckbox extends React.PureComponent {
	render() {
		const {label, disabled, value, type, ...props} = this.props;
		// Extract type = 'checkbox' from props.
		return (
			<FormControlLabel
				label={label}
				disabled={disabled}
				control={
					<Checkbox
						{...props}
						checked={value || false}
					/>
				}
			/>
		);
	}
}

FieldCheckbox.propTypes = {
	...Checkbox.propTypes,
	label: PropTypes.string.isRequired,
};

export default FieldCheckbox;
