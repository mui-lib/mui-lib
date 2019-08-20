'use strict';

import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ISingleSelectorFieldProps} from './props';

interface IProps extends ISingleSelectorFieldProps {

}

export const FieldSingleSelector = (props: IProps) => {
	const {id, label, variant, type, fullWidth, value, values, onChange, ...others} = props;
	return (
		<FormControl {...others} fullWidth={fullWidth} variant={variant}>
			<InputLabel htmlFor={id}>{label}</InputLabel>
			<Select
				value={value} onChange={onChange}
				inputProps={variant === 'outlined' ? undefined : {id: id, name: id}}
				variant='outlined'
				input={variant === 'outlined' ? <OutlinedInput name={id} id={id} labelWidth={48}/> : undefined}
			>
				{values && values.length > 0 ? values.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>) : undefined}
			</Select>
		</FormControl>
	);
};