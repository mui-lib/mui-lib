'use strict';

import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';

interface IButtonAction {
	name: string;
	options?: object;
	onClick: () => any;
}

interface IProps {
	title: string;
	content?: string;
	// Element of the actions should be {name: string, onClick: func, color: string}.
	actions: IButtonAction[];
	buttonContent: React.ReactNode;
	buttonOptions?: object;
}

// A #DialogActionButtons rendering a button by default which when be clicked will pop a dialog mainly to confirm/notice/hint something.
// Names could also be: #DialogConfirmation, #DialogNotice, #SimpleDialog, #ConfirmationDialog.
// @see https://material-ui.com/demos/dialogs/
export const DialogActionButtons: React.FC<IProps> = React.memo<IProps>((props: IProps) => {
	// The uncontrolled state of switch between a #dialog and a #button.
	const [dialogSwitch, setDialogSwitch] = useState(false);
	const {title, content, actions, buttonContent, buttonOptions = {}} = props;

	const onOpenDialog = () => setDialogSwitch(true);
	// Close the dialog and call back.
	const onCloseDialog = (onClick: () => any) => {
		setDialogSwitch(false);
		if (typeof onClick === 'function') {onClick();}
	};

	const renderDialog = () => (
		<Dialog open={dialogSwitch} onClose={onCloseDialog}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{content ? <DialogContentText>{content}</DialogContentText> : undefined}
			</DialogContent>
			{actions && actions.length > 0 ? renderActions() : undefined}
		</Dialog>
	);

	const renderActions = () => (
		<DialogActions>
			{actions.map(({name, options, onClick}, i) => (
				<Button key={i} onClick={() => onCloseDialog(onClick)} {...options}>{name}</Button>
			))}
		</DialogActions>
	);

	const renderButton = () => (
		<Button {...buttonOptions} onClick={onOpenDialog}>
			{buttonContent}
		</Button>
	);

	if (!dialogSwitch) {return renderButton();}
	return (
		<div>
			{renderButton()}
			{renderDialog()}
		</div>
	);
});
