'use strict';

import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, {CheckboxProps} from '@material-ui/core/Checkbox';

interface IProps extends CheckboxProps {
	label: string;
	value: boolean;
	// @see #FormControlLabelProps
	labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

const TheFieldCheckbox = (props: IProps) => {
	const {label, labelPlacement, disabled, value, type, ...others} = props;
	// Extract type = 'checkbox' from props.

	return (
		<FormControlLabel
			label={label}
			disabled={disabled}
			labelPlacement={labelPlacement}
			control={
				<Checkbox
					{...others}
					checked={value || false}
				/>
			}
		/>
	);
};

export const FieldCheckbox: React.FC<IProps> = React.memo<IProps>(TheFieldCheckbox);
