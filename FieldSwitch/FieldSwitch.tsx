'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class FieldSwitch extends React.PureComponent {
	render() {
		const {label, disabled, value, type, ...props} = this.props;
		// Extract type = 'switch' from props.
		return (
			<FormControlLabel
				label={label}
				disabled={disabled}
				control={
					<Switch
						{...props}
						checked={value || false}
					/>
				}
			/>
		);
	}
}

FieldSwitch.propTypes = {
	...Switch.propTypes,
	label: PropTypes.string.isRequired,
};

export default FieldSwitch;
