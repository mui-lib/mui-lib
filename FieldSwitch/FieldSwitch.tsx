'use strict';

import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, {SwitchProps} from '@material-ui/core/Switch';

interface IProps extends SwitchProps {
	fullWidth?: boolean;
	label: string;
	value: boolean;
	// @see #FormControlLabelProps
	labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

const TheFieldSwitch = (props: IProps) => {
	const {fullWidth, label, labelPlacement = 'start', disabled, value, type, ...others} = props;
	// Extract type = 'switch' from props.
	//<FormLabel component="legend">{label}</FormLabel>
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
					<Switch
						{...others}
						checked={value || false}
					/>
				}
			/>
		</FormControl>
	);
};

export const FieldSwitch: React.FC<IProps> = React.memo<IProps>(TheFieldSwitch);
