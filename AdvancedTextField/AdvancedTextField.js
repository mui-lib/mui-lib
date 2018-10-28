'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

// Delay to commit changes since the changes serially is not expected to be updated.
// @see https://gamedev.stackexchange.com/questions/74973/maximum-audio-delay-before-the-player-notices
//
// - [Is-It-Okay] The quick switch(within the #TIME_DELAY milliseconds) between focusing and not focusing will not trigger a update.
// The duration of time to be delayed in milliseconds when triggering the #setState().
const TIME_DELAY = 45;

// The advanced (controlled) #TextField with the #ErrorText support.
//
// - The #HelperText will be displayed when editing(, or not editing if being set so).
// - The #ErrorText will be displayed if any when not editing, but not in the initial state(not edited yet).
// - The #OnEnterPress is not going to be supported yet.
//
// Think about the differences(logical meanings and etc) about label, placeholder, helper text, and error text.
// @see https://material.io/guidelines/components/text-fields.html
class AdvancedTextField extends React.PureComponent {
	state = {
		// Is the TextField currently active?
		isFocusing: false,
		// Is once blurred.
		isEdited: false,
	};

	componentWillUnmount() {
		if (this.mTimer) {clearTimeout(this.mTimer);}
	}

	// this.setState({isFocusing: true, isEdited: true}, () => this.otherOnFocus && this.otherOnFocus(event));
	// if (this.otherOnFocus) {setTimeout(() => this.otherOnFocus(event), 0);}
	onFocus = (event) => {
		this.otherOnFocus && this.otherOnFocus(event);
		if (this.mTimer) {clearTimeout(this.mTimer);}
		setTimeout(() => this.setState({isFocusing: true, isEdited: true}), TIME_DELAY);
	};

	// this.setState({isFocusing: false, isEdited: true}, () => this.otherOnBlur && this.otherOnBlur(event));
	// if (this.otherOnBlur) {setTimeout(() => this.otherOnBlur(event), 0);}
	onBlur = (event) => {
		this.otherOnBlur && this.otherOnBlur(event);
		if (this.mTimer) {clearTimeout(this.mTimer);}
		setTimeout(() => this.setState({isFocusing: false, isEdited: true}), TIME_DELAY);
	};

	render() {
		const {isFocusing, isEdited} = this.state;
		const {showHelperTextWhenNotFocusing, showErrorTextWhenFocusing, helperText, errorText, InputProps, onFocus, onBlur, ...others} = this.props;
		// Save the passed listeners in local.
		if (onFocus) {this.otherOnFocus = onFocus;}
		if (onBlur) {this.otherOnBlur = onBlur;}
		if (InputProps) {
			// Use different listeners instead of the ones from the 3rd party.
			const {onFocus, onBlur, ...other} = InputProps;
			others.InputProps = other;
			if (onFocus) {this.otherOnFocus = onFocus;}
			if (onBlur) {this.otherOnBlur = onBlur;}
		}
		let isHintError = false, realHelperText = undefined;
		if (isFocusing || showHelperTextWhenNotFocusing) {realHelperText = helperText;}
		if (!isFocusing || showErrorTextWhenFocusing) {
			isHintError = isEdited && Boolean(errorText);
			if (isHintError) {realHelperText = errorText;}
		}
		return (
			<TextField
				// The error will be shown after onBlur() value is not valid.
				error={isHintError}
				// FIX-ME What about the #onBlur and #onFocus.
				onBlur={this.onBlur}
				onFocus={this.onFocus}
				// Use a space to make the height of the TextField fixed.
				helperText={realHelperText || ' '}
				{...others}
			/>
		);
	}
}

AdvancedTextField.propTypes = {
	// Whether to show the helper text when not focusing.
	showHelperTextWhenNotFocusing: PropTypes.bool,
	// Whether to show the error text when focusing.
	showErrorTextWhenFocusing: PropTypes.bool,
	errorText: PropTypes.string,
	...TextField.propTypes,
};

export default AdvancedTextField;
