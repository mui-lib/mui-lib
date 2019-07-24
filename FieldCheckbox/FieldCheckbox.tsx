'use strict';

import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, {CheckboxProps} from '@material-ui/core/Checkbox';

interface IProps extends CheckboxProps {
	fullWidth?: boolean;
	label: string;
	value: boolean;
	// @see #FormControlLabelProps
	labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

const TheFieldCheckbox = (props: IProps) => {
	const {fullWidth, label, labelPlacement = 'start', disabled, value, type, ...others} = props;
	// Extract type = 'checkbox' from props.
	// <FormLabel component="legend">{label}</FormLabel>
	return (
		<FormControl
			disabled={disabled}
			fullWidth={fullWidth}
		>
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
		</FormControl>
	);
};

export const FieldCheckbox: React.FC<IProps> = React.memo<IProps>(TheFieldCheckbox);
