'use strict';

import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {ICheckboxFieldProps} from './props'; //, {CheckboxProps}

interface IProps extends ICheckboxFieldProps {
	label: string;
	value: boolean;
	// @see #FormControlLabelProps
	labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

const TheFieldCheckbox = (props: IProps) => {
	const {id, label, type, labelPlacement = 'start', fullWidth, value, onChange, ...others} = props;
	// Extract type = 'checkbox' from props.
	// <FormLabel component="legend">{label}</FormLabel>
	return (
		<FormControl {...others}>
			<FormControlLabel
				label={label}
				labelPlacement={labelPlacement}
				control={
					<Checkbox
						id={id}
						onChange={onChange}
						checked={value || false}
					/>
				}
			/>
		</FormControl>
	);
};

export const FieldCheckbox: React.FC<IProps> = React.memo<IProps>(TheFieldCheckbox);
