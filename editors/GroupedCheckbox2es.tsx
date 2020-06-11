'use strict';

import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {IMultipleSelectorFieldProps} from './props';

// import {ISharedFieldProps} from 'src/EntityEditorExample/components/SimpleEntityEditor/SimpleEntityEditor';

// export interface IProps1 extends IRawProps, StandardTextFieldProps {}
export interface IProps extends IMultipleSelectorFieldProps {
	// Whether to show the helper text when not focusing.
	showHelperTextWhenNotFocusing: boolean;
	errorText: string;
}

export interface IState {
	isFocusing: boolean;
	isEdited: boolean;
}

// The advanced TextField(controlled) with ErrorText support.
//
// - HelperText will be displayed when editing, or not editing if being set so.
// - ErrorText will be displayed if any when not editing, but not in the initial state(not edited yet).
// - OnEnterPress is not going to be supported yet.
//
// Delay to commit changes since the changes serially is not expected to be updated.
// @see https://gamedev.stackexchange.com/questions/74973/maximum-audio-delay-before-the-player-notices
//
// - [Is-It-Okay] The quick switch(within 45 milliseconds) between focusing and not focusing will not trigger a update.
//
// Think about the differences about helper text, and placeholder, label, and error text.
// @see https://material.io/guidelines/components/text-fields.html
export class GroupedCheckbox2es extends React.PureComponent<IProps> {
	mTimer: number;
	otherOnBlur?: (param: any) => void;
	otherOnFocus?: (param: any) => void;

	state: IState = {
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
	onFocus = (event: any) => {
		this.otherOnFocus && this.otherOnFocus(event);
		if (this.mTimer) {clearTimeout(this.mTimer);}
		setTimeout(() => this.setState({isFocusing: true, isEdited: true}), 45);
	};

	// this.setState({isFocusing: false, isEdited: true}, () => this.otherOnBlur && this.otherOnBlur(event));
	// if (this.otherOnBlur) {setTimeout(() => this.otherOnBlur(event), 0);}
	onBlur = (event: any) => {
		this.otherOnBlur && this.otherOnBlur(event);
		if (this.mTimer) {clearTimeout(this.mTimer);}
		setTimeout(() => this.setState({isFocusing: false, isEdited: true}), 45);
	};

	onChange = (key: string) => ({target}: React.ChangeEvent, checked: boolean) => {
		const {onChange, id, values, value, minimum, minimumErrorText, maximum, maximumErrorText} = this.props;
		const selected = new Map();
		if (value) {value.map((key: string) => selected[key] = true);}
		// console.log(values, value, key, checked);
		selected[key] = checked;
		const _value = values.map(item => item.value).filter(item => selected[item]);
		if (minimum && _value.length < minimum) {return alert(minimumErrorText);}
		if (maximum && _value.length > maximum) {return alert(maximumErrorText);}
		onChange({target: {id: id, value: _value}} as any as React.ChangeEvent<HTMLInputElement>);
	};

	render() {
		const {isFocusing, isEdited} = this.state;
		const {showHelperTextWhenNotFocusing, helperText, errorText, InputProps, onFocus, onBlur, onChange, id, label, values, value, placeholder, multiline, minimum, minimumErrorText, maximum, maximumErrorText, ...others} = this.props;
		const selected = new Map();
		if (value) {value.map((key: string) => selected[key] = true);}
		// Save the passed listeners in local.
		if (onFocus) {this.otherOnFocus = onFocus;}
		if (onBlur) {this.otherOnBlur = onBlur;}
		if (InputProps) {
			// Use different listeners instead of the ones from the 3rd party.
			const {onFocus, onBlur} = InputProps;
			// others.InputProps = other; //, ...other
			if (onFocus) {this.otherOnFocus = onFocus;}
			if (onBlur) {this.otherOnBlur = onBlur;}
		}
		let isHintError = false, realHelperText = undefined;
		if (isFocusing) {
			realHelperText = helperText;
		} else {
			isHintError = isEdited && Boolean(errorText);
			if (isHintError) {
				realHelperText = errorText;
			} else {
				realHelperText = showHelperTextWhenNotFocusing ? helperText : undefined;
			}
		}
		return (
			<FormControl
				component="fieldset"
				// The error will be shown after onBlur() value is not valid.
				error={isHintError}
				onBlur={this.onBlur}
				onFocus={this.onFocus}
				{...others}
			>
				<FormLabel component="legend">{label}</FormLabel>
				<FormGroup row={false}>
					{values.map(item => (
						<FormControlLabel
							key={item.value}
							control={
								<Checkbox
									checked={Boolean(selected[item.value])}
									onChange={this.onChange(item.value)}
									value={item.value}
								/>
							}
							label={item.label}
						/>
					))}
				</FormGroup>
				<FormHelperText>{realHelperText || placeholder}</FormHelperText>
			</FormControl>
		);
		// The error will be shown after onBlur() value is not valid.
		// FIX-ME What about the #onBlur and #onFocus.
		// Use a space to make the height of the TextField fixed.
		// helperText={realHelperText || ' '}
	}
}
