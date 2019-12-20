//

import React from 'react';
import clsx from 'clsx';
import {useStyles} from './ViewLabelsAndValues.styles';

// [ label, value, flexLabel, flexValue ]
export type ISingleLabelValue = [string | any, any, number?, number?]
export type IRowLabelValue = ISingleLabelValue | ISingleLabelValue[]

interface IProps {
	// TO-DO Support multiple modes:
	// [ A. Text Mode(minWidth=120) | B. Border-less Table | C. Table(Bordered Table) ]
	mode: string;
	// In the mode.
	dataset: IRowLabelValue[];

	// Style for the overall table.
	className?: string;
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
// This like exactly the table view of keys and values, and hence may be named as #TableOfKeysAndValues.
export const ViewLabelsAndValues = React.memo<IProps>((
	{
		dataset, className, style, separator,
		padding = 8, flexLabel = 1, flexValue = 2, styleLabel, styleValue,
	},
) => {
	const cls = useStyles();

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

	return (
		<div className={className ? [cls.ctnTableRoot, className].join(' ') : cls.ctnTableRoot} style={style}>
			{dataset.map((row, index) => renderComplexRow(index, Array.isArray(row[0]) ? row : [row] as ISingleLabelValue[]))}
		</div>
	);
});
