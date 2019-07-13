'use strict';

import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, {SwitchProps} from '@material-ui/core/Switch';

interface IProps extends SwitchProps {
	label: string;
	value: boolean;
	// @see #FormControlLabelProps
	labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

const TheFieldSwitch = (props: IProps) => {
	const {label, labelPlacement, disabled, value, type, ...others} = props;
	// Extract type = 'switch' from props.
	return (
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
	);
};

export const FieldSwitch: React.FC<IProps> = React.memo<IProps>(TheFieldSwitch);
