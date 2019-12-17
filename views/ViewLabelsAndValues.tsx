//

import React from 'react';
import clsx from 'clsx';
import {useStyles} from './ViewLabelsAndValues.styles';

// [ label, value, flexLabel, flexValue ]
export type ISingleLabelValue = [string | any, any, number?, number?]
export type IRowLabelValue = ISingleLabelValue[]

interface IProps {
	// Normal( Text Mode(minWidth=120) | Border-less Table) | Table(Bordered Table)
	mode: string;
	// In the mode.
	data: ISingleLabelValue[];
	dataset?: IRowLabelValue[];

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
		data, dataset, style, separator,
		padding = 8, flexLabel = 1, flexValue = 2, styleLabel, styleValue,
	},
) => {
	const cls = useStyles();

	const renderSimpleRow = (index: number, [label, value]: ISingleLabelValue) => (
		<div className={clsx(cls.ctnTableRow, {[cls.ctnTableRowsFollowed]: index !== 0})} key={index}>
			<div className={cls.ctnTableLabel} style={{flex: flexLabel, ...styleLabel}}>
				<div className={cls.ctnTableLabelDiv} style={{padding}}>{label}{separator}</div>
			</div>
			<div className={cls.ctnTableValue} style={{flex: flexValue, ...styleValue}}>
				<div className={cls.ctnTableValueDiv} style={{padding}}>{value}</div>
			</div>
		</div>
	);

	const renderComplexRow = (index: number, bundles: ISingleLabelValue[]) => (
		<div className={clsx(cls.ctnTableRow, {[cls.ctnTableRowsFollowed]: index !== 0})} key={index}>
			{bundles.map(([label, value, fLabel, fValue], index) => (
				<div key={index} className={cls.ctnCellLabelValue}>
					<div className={cls.ctnTableLabel} style={{flex: fLabel || flexLabel, ...styleLabel}}>
						<div className={cls.ctnTableLabelDiv} style={{padding}}>{label}{separator}</div>
					</div>
					<div className={cls.ctnTableValue} style={{flex: fValue || flexValue, ...styleValue}}>
						<div className={cls.ctnTableValueDiv} style={{padding}}>{value}</div>
					</div>
				</div>
			))}
		</div>
	);

	return dataset ? (
		<div className={cls.ctnTableRoot} style={style}>
			{dataset.map((row, index) => renderComplexRow(index, row))}
		</div>
	) : (
		<div className={cls.ctnTableRoot} style={style}>
			{data.map((row, index) => renderSimpleRow(index, row))}
		</div>
	);
});
