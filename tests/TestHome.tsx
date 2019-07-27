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
import {SimpleFieldEditor} from '../SimpleFieldEditor/SimpleFieldEditor';

interface IProps {

}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		bodyBox: {maxWidth: 960, margin: '0 auto'},
		sectionTitle: {margin: 4},
		sectionBox: {margin: theme.spacing(1.5), background: '#eee', padding: '8px 12px', borderRadius: '5px'},
	}),
);

interface ISectionProps {
	title: string;
	children: React.ReactNode;
}

const DemoSection = (props: ISectionProps) => {
	const classes = useStyles();
	const {title, children} = props;
	return (
		<div className={classes.sectionBox}>
			<h3 className={classes.sectionTitle}>{title}</h3>
			{children}
		</div>
	);
};

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
		<div className={classes.bodyBox}>
			<DemoSection title={'CountdownBySeconds'}>
				<span>There are <CountdownBySeconds seconds={30}/> seconds left to have supper now!</span>
			</DemoSection>
			<DemoSection title={'ButtonDialog'}>
				<ButtonDialog
					buttonContent={'Hello'}
					buttonOptions={{color: 'primary', variant: 'contained'}}
					title={'Would like to have supper?'}
					actions={[{name: 'Okay', onClick: () => console.log('Clicked Okay')}]}
				/>
			</DemoSection>
			<DemoSection title={'DialogToConfirm'}>
				<DialogToConfirm
					buttonText={'Go Through'}
					buttonProps={{color: 'primary', variant: 'contained'}}
					dialogTitle={'Have Dinner?'}
					buttonConfirmText={'Okay'}
					onConfirm={() => console.log('confirmed')}
				/>
			</DemoSection>
			<DemoSection title={'FieldCheckbox'}>
				<FieldCheckbox
					label={'Had a good day?'}
					value={checkbox}
					// @ts-ignore
					onChange={(ele: any, value: boolean): any => setCheckbox(value)}
				/>
			</DemoSection>
			<DemoSection title={'FieldSwitch'}>
				<FieldSwitch
					label={'Had a good day?'}
					labelPlacement={'start'}
					value={checkbox}
					onChange={(ele: any, value: boolean): any => setCheckbox(value)}
				/>
			</DemoSection>
			<DemoSection title={'AdvancedTextField'}>
				<AdvancedTextField
					label={'Last Name'}
					showHelperTextWhenNotFocusing={false}
					placeholder={'What is your last name?'}
					helperText={'Just for a test!'}
				/>
			</DemoSection>
			<DemoSection title={'SimpleFieldEditor'}>
				<SimpleFieldEditor
					id={'name'}
					type={'string'}
					label={'Nick Name'}
					showHelperTextWhenNotFocusing={false}
					placeholder={'What is your nick name?'}
					helperText={'Just for a test!'}
					onChange={({target: {value}}: any) => onPatchChange({...patch, name: value})}
					value={patch['name'] || ''}
				/>
			</DemoSection>
			<DemoSection title={'SimpleEntityEditor'}>
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
			</DemoSection>
		</div>
	);
};

export const TestHome: React.FC<IProps> = React.memo<IProps>(TheTestHome);
