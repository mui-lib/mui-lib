'use strict';

import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {IConfirmDialogDefinition} from '../dialogs/definitions';
import {getResolvedConfirmationOptions} from '../dialogs/helpers';

interface IProps {
	disabled?: boolean;
	buttonText: string;
	buttonProps?: IButtonProps;
	// Dialog configurations.
	DialogProps: IConfirmDialogDefinition;
	onConfirm: () => any;
	// onCancel?: () => any;
}

export interface IButtonProps {
	// import {PropTypes} from '@material-ui/core';
	color?: 'inherit' | 'primary' | 'secondary' | 'default';
	disableFocusRipple?: boolean;
	fullWidth?: boolean;
	href?: string;
	size?: 'small' | 'medium' | 'large';
	variant?: 'text' | 'outlined' | 'contained';
}

// Rendering a button triggering a dialog to confirm something.
//
// FIX-ME It is duplicate with the #ButonDialog.
// FIX-ME Naming to #dialogs/ButtonConfirmDialog.
//
// The state of dialog switch is uncontrolled.
export const DialogToConfirm: React.FC<IProps> = React.memo<IProps>((props: IProps) => {
	const {DialogProps, disabled, buttonText, buttonProps} = props;

	const [dialogSwitch, setDialogSwitch] = useState(false);

	const onOpenDialog = () => setDialogSwitch(true);
	const onCloseDialog = () => setDialogSwitch(false);

	const renderActionButton = () => (
		<Button disabled={disabled} onClick={onOpenDialog} {...buttonProps}>
			{buttonText}
		</Button>
	);

	// Consider the animation of the dialog and the mount/unmount performance.
	if (!dialogSwitch) {return renderActionButton();}

	const onConfirm = () => {
		const {onConfirm} = props;
		onCloseDialog();
		onConfirm();
	};

	const {minWidth, title, domDescription, labelConfirmButton, labelCancelButton} = getResolvedConfirmationOptions(DialogProps);
	const renderDialog = () => (
		<Dialog open={dialogSwitch} onClose={onCloseDialog} disableBackdropClick={Boolean(labelCancelButton)}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent style={{minWidth: minWidth}}>
				{domDescription}
			</DialogContent>
			<DialogActions>
				{labelCancelButton ? <Button onClick={onCloseDialog}>{labelCancelButton}</Button> : undefined}
				<Button onClick={onConfirm} color='primary'>{labelConfirmButton}</Button>
			</DialogActions>
		</Dialog>
	);

	return (
		<div style={{display: 'inline-block'}}>
			{dialogSwitch ? renderDialog() : undefined}
			{renderActionButton()}
		</div>
	);
});
