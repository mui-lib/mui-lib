'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

// Rendering a button triggering a dialog to confirm something.
//
// The state of dialog switch is uncontrolled.
class DialogToConfirm extends React.Component {
	state = {
		dialogSwitch: false,
	};

	onOpenDialog = () => this.setState({dialogSwitch: true});
	onCloseDialog = () => this.setState({dialogSwitch: false});

	onConfirm = () => {
		const {onConfirm} = this.props;
		this.onCloseDialog();
		onConfirm();
	};

	// <DialogContent>
	//      <DialogContentText id='alert-dialog-description'></DialogContentText>
	// </DialogContent>
	renderDialog = ({classes, dialogTitle, buttonConfirmText, buttonCancelText} = this.props, {dialogSwitch} = this.state) => {
		return (
			<Dialog open={dialogSwitch} onClose={this.onCloseDialog}>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogActions>
					{buttonCancelText ? <Button onClick={this.onCloseDialog}>{buttonCancelText}</Button> : undefined}
					<Button onClick={this.onConfirm} color='primary'>{buttonConfirmText}</Button>
				</DialogActions>
			</Dialog>
		);
	};

	renderActionButton = ({classes, disabled, buttonText, buttonProps} = this.props) => {
		return (
			<Button {...buttonProps} disabled={disabled} onClick={this.onOpenDialog}>
				{buttonText}
			</Button>
		);
	};

	render() {
		const {dialogSwitch} = this.state;
		return (
			<div style={{display: 'inline-block'}}>
				{dialogSwitch ? this.renderDialog() : undefined}
				{this.renderActionButton()}
			</div>
		);
	}
}

DialogToConfirm.propTypes = {
	buttonText: PropTypes.string.isRequired,
	buttonProps: PropTypes.object,
	disabled: PropTypes.bool,
	onConfirm: PropTypes.func.isRequired,
	// Dialog configurations.
	dialogTitle: PropTypes.string.isRequired,
	buttonConfirmText: PropTypes.string.isRequired,
	buttonCancelText: PropTypes.string,
};

export default DialogToConfirm;

