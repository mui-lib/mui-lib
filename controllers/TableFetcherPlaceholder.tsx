//

import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export type IPlaceholderVariant = 'large' | 'medium' | 'mini' | 'default'

interface IProps {
	message: string;
	size?: IPlaceholderVariant;
}

const getHeight = (variant?: IPlaceholderVariant): number => {
	switch (variant) {
		case 'large':
			return 440;
		case 'medium':
			return 240;
		case 'mini':
			return 120;
		case 'default':
		default:
			return 440;
	}
};

// A placeholder for table of empty dataset.
export const TableFetcherPlaceholder = React.memo(({message, size}: IProps) => (
	<TableRow style={{height: getHeight(size)}}>
		<TableCell align="center" colSpan={15} style={{border: 'none', color: 'gray'}}>{message}</TableCell>
	</TableRow>
));
