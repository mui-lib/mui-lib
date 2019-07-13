'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';

const muiStyles = {};

// A #ButtonDialog rendering a button by default which when be clicked will pop a dialog mainly to confirm/notice/hint something.
// Names could also be: #DialogConfirmation, #DialogNotice, #SimpleDialog, #ConfirmationDialog.
// @see https://material-ui.com/demos/dialogs/
class ButtonDialog extends React.Component {
	state = {
		// The uncontrolled state of switch between a #dialog and a #button.
		dialogSwitch: false,
	};

	onOpenDialog = () => this.setState({dialogSwitch: true});
	// Close the dialog and call back.
	onCloseDialog = (onClick) => {
		this.setState({dialogSwitch: false});
		if (typeof onClick === 'function') {onClick();}
	};

	renderDialog = ({title, content, actions} = this.props, {dialogSwitch} = this.state) => (
		<Dialog open={dialogSwitch} onClose={this.onCloseDialog}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{content ? <DialogContentText>{content}</DialogContentText> : undefined}
			</DialogContent>
			{actions && actions.length > 0 ? this.renderActions(actions) : undefined}
		</Dialog>
	);

	renderActions = (actions) => (
		<DialogActions>
			{actions.map(({name, options, onClick}, i) => (
				<Button key={i} onClick={() => this.onCloseDialog(onClick)} {...options}>{name}</Button>
			))}
		</DialogActions>
	);

	renderButton = ({buttonContent, buttonOptions = {}} = this.props) => (
		<Button {...buttonOptions} onClick={this.onOpenDialog}>
			{buttonContent}
		</Button>
	);

	render() {
		const {dialogSwitch} = this.state;
		if (dialogSwitch) {
			return (
				<div>
					{this.renderButton()}
					{this.renderDialog()}
				</div>
			);
		}
		return this.renderButton();
	}
}

ButtonDialog.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	// Element of the actions should be {name: string, onClick: func, color: string}.
	actions: PropTypes.array,
	buttonContent: PropTypes.any.isRequired,
	buttonOptions: PropTypes.object,
};

export default withStyles(muiStyles)(ButtonDialog);
