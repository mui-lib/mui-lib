//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table, {Padding, Size} from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Radio from '@material-ui/core/Radio';
import {TableFetcherPlaceholder} from './TableFetcherPlaceholder';

const useStyles = makeStyles({
	ctnTable: {position: 'relative'},
	// The border should share a same radius with the table root.
	ctnBorder: {position: 'absolute', top: '0', bottom: '0', right: '0', left: '0', border: '1px solid #ddd', borderRadius: '6px 6px 0 0', pointerEvents: 'none'},
	root: {minWidth: 650, borderRadius: '6px', background: '#eee'},
	row: {cursor: 'pointer', '&:hover': {background: '#e6e6e6'}},
	rowEven: {background: '#fafafa'},
	rowOdd: {background: '#f5f5f5'},
});

interface ID {
	// id: string;
}

type IAlign = 'inherit' | 'left' | 'center' | 'right' | 'justify';
type IPadding = Padding

// type IField = React.ReactNode | [React.ReactNode, IAlign, Padding];

type IReactNode = React.ReactNode

type IRenderer = (entry: any, value: any, index: number) => IReactNode

export interface ITableColumn {
	header: IReactNode;
	key: string;
	align?: IAlign;
	padding?: IPadding;
	default?: IReactNode;
	render?: IRenderer;
}

export const newTableColumn = (key: string, header: IReactNode, align?: IAlign, defaultValue?: IReactNode, padding?: IPadding, render?: IRenderer): ITableColumn =>
	({key, header, align, padding, default: defaultValue, render});
export const nextTableColumn = (key: string, header: IReactNode, render?: IRenderer): ITableColumn =>
	({key, header, render});

export const KeyFieldIndex = '$index';

interface ITableBorder {
	no?: boolean;
	border?: string;
	radius?: string;
}

interface IProps<T extends ID> {
	entries?: T[];
	columns: ITableColumn[];
	// keys: string[];
	// The default values of the a target field.
	// defaults: React.ReactNode[];
	keyEntryId: string;
	selectedEntryId?: string;
	placeholder: string;//React.ReactNode;
	// labels: IField[];
	// values: IField[][];
	onSelectEntry: (id: string | number, entry: T) => any;

	// Table Configures/Options
	align?: IAlign,
	defaultValue?: IReactNode,
	padding?: IPadding
	size?: Size;
	// x ~~Give a empty border to enable the table border.~~
	// √ Give a empty border to disable the default table border.
	border?: ITableBorder;
}


// A selectable table for choices.
const TableSelectableRows = React.memo(<T extends ID>(props: IProps<T>) => {
	const cls = useStyles();
	const {
		entries, columns, placeholder,
		keyEntryId, selectedEntryId, onSelectEntry,
		size, //labels, values,
		align, defaultValue = '', padding,
		border,
	} = props;
	const filtered = entries ? entries.filter(entry => Boolean(entry[keyEntryId])) : undefined;

	const renderRows = (entry: T, index: number) => (
		<TableRow key={entry[keyEntryId]} className={cls.row + ' ' + (index % 2 === 0 ? cls.rowEven : cls.rowOdd)} onClick={() => onSelectEntry(entry[keyEntryId], entry)}>
			<TableCell align="center" padding='checkbox'>
				<Radio checked={selectedEntryId === entry[keyEntryId]}/>
			</TableCell>
			{columns.map((column) => (
				<TableCell key={column.key} align={column.align || align} padding={column.padding || padding}>
					{column.render ? (
						column.render(entry, entry[column.key], index)
					) : (
						column.key === KeyFieldIndex ? index + 1 : entry[column.key] || column.default || defaultValue || ''
					)}
				</TableCell>
			))}
		</TableRow>
	);

	const renderTable = () => (
		// @see https://material-ui.com/components/tables/
		<Table className={cls.root} size={size}>
			<TableHead>
				<TableRow>
					<TableCell align="center" padding='checkbox'> </TableCell>
					{columns.map((column, index) => (
						<TableCell key={index} align={column.align || align} padding={column.padding || padding}>{column.header}</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{filtered ? filtered.map(renderRows) : (
					<TableFetcherPlaceholder message={placeholder} size='mini'/>
				)}
			</TableBody>
		</Table>
	);
	// Disable the default border explicitly.
	if (border && border.no) {return renderTable();}
	// Give a empty border to disable the default table border.
	if (border && !border.border && !border.radius) {return renderTable();}
	return (
		<div className={cls.ctnTable}>
			{renderTable()}
			<div className={cls.ctnBorder} style={border ? {
				...(border.border ? {border: border.border} : undefined),
				...(border.radius ? {borderRadius: border.radius} : undefined),
			} : undefined}/>
		</div>
	);

});

export const getViewSelectableTable = <T extends ID>(): React.FC<IProps<T>> => TableSelectableRows;
