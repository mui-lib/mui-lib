'use strict';

import React, {useState} from 'react';
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import {ButtonDialog} from '../ButtonDialog/ButtonDialog';
import {CountdownBySeconds} from '../CountdownBySeconds/CountdownBySeconds';
import {DialogToConfirm} from '../DialogToConfirm/DialogToConfirm';
import {FieldCheckbox} from '../FieldCheckbox/FieldCheckbox';
import {FieldSwitch} from '../FieldSwitch/FieldSwitch';

interface IProps {

}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		sectionBox: {margin: theme.spacing(3)},
	}),
);

const TheTestHome = () => {

	const [checkbox, setCheckbox] = useState(false);
	const classes = useStyles();

	return (
		<div>
			<div className={classes.sectionBox}>
				<span>There are <CountdownBySeconds seconds={30}/> seconds left to have supper now!</span>
			</div>
			<div className={classes.sectionBox}>
				<ButtonDialog
					buttonContent={'Hello'}
					buttonOptions={{color: 'primary', variant: 'contained'}}
					title={'Would like to have supper?'}
					actions={[{name: 'Okay', onClick: () => console.log('Clicked Okay')}]}
				/>
			</div>
			<div className={classes.sectionBox}>
				<DialogToConfirm
					buttonText={'Go Through'}
					buttonProps={{color: 'primary', variant: 'contained'}}
					dialogTitle={'Have Dinner?'}
					buttonConfirmText={'Okay'}
					onConfirm={() => console.log('confirmed')}
				/>
			</div>
			<div className={classes.sectionBox}>
				<FieldCheckbox
					label={'Had a good day?'}
					value={checkbox}
					onChange={(ele: any, value: boolean): any => Boolean(console.log(value)) || setCheckbox(value)}
				/>
			</div>
			<div className={classes.sectionBox}>
				<FieldSwitch
					label={'Had a good day?'}
					labelPlacement={'start'}
					value={checkbox}
					onChange={(ele: any, value: boolean): any => Boolean(console.log(value)) || setCheckbox(value)}
				/>
			</div>
		</div>
	);
};

export const TestHome: React.FC<IProps> = React.memo<IProps>(TheTestHome);
