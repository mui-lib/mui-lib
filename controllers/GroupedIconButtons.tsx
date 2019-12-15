//

import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconViewList from '@material-ui/icons/ViewListRounded';

export interface IGroupedIconButton<Key = number> {
	key: Key;
	// hide: boolean;
	// FIX-ME Figure out what is the type of #IconViewList.
	TargetIcon: typeof IconViewList;
}

export const defineNewIcon = (key: number, comp: typeof IconViewList): IGroupedIconButton => ({key, TargetIcon: comp});

interface IProps<T = number> {
	icons: IGroupedIconButton<T>[];
	// font: 'small'; size: 'small';
	color: string;
	mode: number;
	onChange: (mode: number) => any;
}

// Selectable Grouped (Icon)Buttons.
export const GroupedIconButtons = React.memo<IProps>(({icons, color, mode, onChange}) => {
	const font = 'small';
	const size = 'small';
	return (
		<ButtonGroup size="small">
			{icons.map(icon => (
				<Button
					key={icon.key} size={size}
					style={mode === icon.key ? {background: color, color: 'white'} : {color}}
					onClick={() => onChange(icon.key)}
				>
					<icon.TargetIcon fontSize={font}/>
				</Button>
			))}
		</ButtonGroup>
	);
});
