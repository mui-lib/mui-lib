'use strict';

import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import {IConfirmDialogPropsDefinition} from '../dialogs/definitions';

interface IProps {
	disabled?: boolean;
	buttonText: string;
	buttonProps?: IButtonProps;
	// Dialog configurations.
	DialogProps: IConfirmDialogPropsDefinition;
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
const TheDialogToConfirm = (props: IProps) => {
	const {DialogProps, disabled, buttonText, buttonProps} = props;
	const {title, labelConfirmButton, labelCancelButton, ...options} = DialogProps;

	const [dialogSwitch, setDialogSwitch] = useState(false);

	const onOpenDialog = () => setDialogSwitch(true);
	const onCloseDialog = () => setDialogSwitch(false);

	const onConfirm = () => {
		const {onConfirm} = props;
		onCloseDialog();
		onConfirm();
	};

	const renderDialog = () => {
		return (
			<Dialog open={dialogSwitch} onClose={onCloseDialog} disableBackdropClick={Boolean(labelCancelButton)}>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent style={{minWidth: options.minWidth}}>
					{options.domDescription || (options.description ? <DialogContentText>{options.description}</DialogContentText> : undefined)}
				</DialogContent>
				<DialogActions>
					{labelCancelButton ? <Button onClick={onCloseDialog}>{labelCancelButton}</Button> : undefined}
					<Button onClick={onConfirm} color='primary'>{labelConfirmButton}</Button>
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
