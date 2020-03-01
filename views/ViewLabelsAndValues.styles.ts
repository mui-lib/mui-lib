//

import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
	ctnRoot: {display: 'flex', flexFlow: 'column', alignItems: 'start'},
	ctnRow: {display: 'flex'},
	ctnLabel: {display: 'inline-block', minWidth: '120px', color: '#000000d9'},
	ctnValue: {color: '#000000a6'},

	// May use alignItems: 'start' to keep children auto-sized, if they should.
	ctnTableRoot: {display: 'flex', flexFlow: 'column', border: '1px solid #ccc'},
	ctnTableRow: {display: 'flex'},
	ctnTableRowsFollowed: {borderTop: '1px solid #ddd'},
	ctnCellLabelValue: {display: 'flex', width: '100%'},
	ctnTableLabel: {
		color: '#000000d9', background: '#eee',
		// The default padding and flex.
		flex: 1,
		display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
	},
	// The default padding for label and value.
	ctnTableLabelDiv: {padding: '8px', display: 'flex'},
	//{display: 'inline-block', minWidth: '120px', color: '#000000d9'},
	ctnTableValue: {
		color: '#000000a6',
		// The default padding and flex.
		flex: 2,
		overflowWrap: 'break-word',
		// Forcefully break words inside the flex div.
		// On the way being professional at CSSSS :) :) :) ;).
		// @see https://stackoverflow.com/questions/26465745/ellipsis-in-flexbox-container
		minWidth: '1%',
		display: 'flex', alignItems: 'center', wordBreak: 'break-all',
	},
	ctnTableValueDiv: {padding: '8px', display: 'flex'},
});
