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
import {AdvancedTextField} from '../AdvancedTextField/AdvancedTextField';
import {SimpleEntityEditor} from '../SimpleEntityEditor/SimpleEntityEditor';
import {FieldAutoCompleteOff, FieldMarginDense, FieldTypeString} from '../SimpleEntityEditor/instances';

interface IProps {

}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		sectionBox: {margin: theme.spacing(3)},
	}),
);

const defaultOptions = {
	required: true,
	fullWidth: true,
	margin: FieldMarginDense,
	type: FieldTypeString,
	multiline: false,
	autoComplete: FieldAutoCompleteOff,
};


const TheTestHome = () => {

	const [patch, setPatch] = useState({});
	const [checkbox, setCheckbox] = useState(false);
	const classes = useStyles();

	const onPatchChange = (patch: object) => {
		console.log('patch changed:', patch);
		setPatch({...patch});
	};

	console.log('checkbox', checkbox, 'patch:', patch);

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
					onChange={(ele: any, value: boolean): any => setCheckbox(value)}
				/>
			</div>
			<div className={classes.sectionBox}>
				<FieldSwitch
					label={'Had a good day?'}
					labelPlacement={'start'}
					value={checkbox}
					onChange={(ele: any, value: boolean): any => setCheckbox(value)}
				/>
			</div>
			<div className={classes.sectionBox}>
				<AdvancedTextField
					label={'Last Name'}
					showHelperTextWhenNotFocusing={false}
					placeholder={'What is your last name?'}
					helperText={'Just for a test!'}
				/>
			</div>
			<div className={classes.sectionBox}>
				<SimpleEntityEditor
					entityFields={[{
						...defaultOptions,
						id: 'name',
						label: 'Name',
						placeholder: 'what will be your name?',
						required: false,
						getErrorText: () => undefined,
					}, {
						...defaultOptions,
						id: 'email',
						label: 'Email',
						placeholder: 'what is your email?',
						getErrorText: (value: string) => !value ? undefined : (!value.includes('@') ? 'Please give a valid email!' : undefined),
					}]}
					onPatchChange={onPatchChange}
					targetEntity={{}}
					entityPatch={patch}
					TextField={AdvancedTextField}
				/>
			</div>
		</div>
	);
};

export const TestHome: React.FC<IProps> = React.memo<IProps>(TheTestHome);
