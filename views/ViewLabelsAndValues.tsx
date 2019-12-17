//

import React from 'react';
import clsx from 'clsx';
import {useStyles} from './ViewLabelsAndValues.styles';

// [ label, value ]
export type ISingleLabelValue = [string | any, any]
export type IRowLabelValue = ISingleLabelValue[]

interface IProps {
	// Normal( Text Mode(minWidth=120) | Border-less Table) | Table(Bordered Table)
	mode: string;
	// In the mode.
	data: ISingleLabelValue[];
	// dataset: IRowLabelValue[];

	// Style for the overall table.
	style?: object;
	separator?: string;

	// Styles for labels and values.
	padding?: string | number;
	flexLabel?: number;
	flexValue?: number;
	styleLabel?: object;
	styleValue?: object;
}

// A view component exhibit #Labels and corresponding #Values.
// Like [#Descriptions](https://ant.design/components/descriptions) in Ant Design.
export const ViewLabelsAndValues = React.memo<IProps>((
	{
		data, style, separator,
		padding = 8, flexLabel = 1, flexValue = 2, styleLabel, styleValue,
	},
) => {
	const cls = useStyles();

	const renderSimpleRow = (index: number, [label, value]: ISingleLabelValue) => (
		<div className={clsx(cls.ctnTableRow, {[cls.ctnTableRowsFollowed]: index !== 0})} key={index}>
			<div className={cls.ctnTableLabel} style={{padding, flex: flexLabel, ...styleLabel}}>
				<span>{label}{separator}</span>
			</div>
			<div className={cls.ctnTableValue} style={{padding, flex: flexValue, ...styleValue}}>
				<span>{value}</span>
			</div>
		</div>
	);

	return (
		<div>
			<div className={cls.ctnTableRoot} style={style}>
				{data.map((row, index) => renderSimpleRow(index, row))}
			</div>
		</div>
	);
});
