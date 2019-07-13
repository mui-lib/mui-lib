'use strict';

import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

interface IProps {
	disabled?: boolean;
	buttonText: string;
	buttonProps?: IButtonProps;
	// Dialog configurations.
	dialogTitle: string;
	// dialogDescription?: string;
	buttonConfirmText: string;
	buttonCancelText?: string;
	onConfirm: () => any;
	// onCancel?: () => any;
}

interface IButtonProps {
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
//
// The state of dialog switch is uncontrolled.
const TheDialogToConfirm = (props: IProps) => {
	const {dialogTitle, buttonConfirmText, buttonCancelText, disabled, buttonText, buttonProps} = props;

	const [dialogSwitch, setDialogSwitch] = useState(false);

	const onOpenDialog = () => setDialogSwitch(true);
	const onCloseDialog = () => setDialogSwitch(false);

	const onConfirm = () => {
		const {onConfirm} = props;
		onCloseDialog();
		onConfirm();
	};

	// <DialogContent>
	//      <DialogContentText id='alert-dialog-description'></DialogContentText>
	// </DialogContent>
	const renderDialog = () => {
		return (
			<Dialog open={dialogSwitch} onClose={onCloseDialog}>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogActions>
					{buttonCancelText ? <Button onClick={onCloseDialog}>{buttonCancelText}</Button> : undefined}
					<Button onClick={onConfirm} color='primary'>{buttonConfirmText}</Button>
				</DialogActions>
			</Dialog>
		);
	};

	const renderActionButton = () => {
		return (
			<Button disabled={disabled} onClick={onOpenDialog} {...buttonProps}>
				{buttonText}
			</Button>
		);
	};

	// Consider the animation of the dialog and the mount/unmount performance.
	if (!dialogSwitch) {return renderActionButton();}
	return (
		<div style={{display: 'inline-block'}}>
			{dialogSwitch ? renderDialog() : undefined}
			{renderActionButton()}
		</div>
	);
};

export const DialogToConfirm: React.FC<IProps> = React.memo<IProps>(TheDialogToConfirm);
