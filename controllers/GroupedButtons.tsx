//

import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export interface IGroupedButton<Key = number> {
	key: Key;
	// FIX-ME Figure out what is the type of #IconViewList.
	label: string;
}

export const defineNewGroupedButton = (key: number, label: string): IGroupedButton => ({key, label});

interface IProps<T = number> {
	buttons: IGroupedButton<T>[];
	// font: 'small'; size: 'small';
	size?: 'small' | 'medium' | 'large';
	color?: 'primary' | 'secondary';
	mode: number;
	onChange: (mode: number) => any;
}

// Selectable Grouped Buttons, exactly like #Tabs.
export const GroupedButtons = React.memo<IProps>(({buttons, size, color, mode, onChange}) => {
	return (
		<ButtonGroup size={size}>
			{buttons.map(button => (
				<Button
					key={button.key} size={size} color={mode === button.key ? color : undefined}
					variant={'contained'}
					// style={mode === button.key ? {background: color, color: 'white'} : {color}}
					onClick={() => onChange(button.key)}
				>
					{button.label}
				</Button>
			))}
		</ButtonGroup>
	);
});
