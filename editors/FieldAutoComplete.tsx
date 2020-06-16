import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {ISelectorItem} from 'src/mui-lib/editors/definitions';
import {_CommonFields} from './commons';
import IFieldMargin = _CommonFields.IFieldMargin;
import IFieldAutoComplete = _CommonFields.IFieldAutoComplete;

interface IProps {
	id: string;
	label: string;
	variant: 'outlined';
	// type?: IFieldType;
	placeholder?: string;
	multiline?: boolean;
	style?: React.CSSProperties;

	fullWidth?: boolean;
	margin?: IFieldMargin;
	autoComplete?: IFieldAutoComplete;

	required?: boolean;
	helperText?: string;
	errorText?: string;

	values: ISelectorItem[];
	onChange: (value: string) => any;
}

export const FieldAutoComplete = React.memo((
	{
		values, onChange, ...others
	}: IProps,
) => {
	const [value, setValue] = React.useState<ISelectorItem | null>(null);
	const [inputValue, setInputValue] = React.useState('');

	return (
		<Autocomplete
			style={{minWidth: 180, display: 'inline-block'}}
			//disableClearable
			id="id-auto-complete" freeSolo options={values} getOptionLabel={(option) => typeof option === 'string' ? option || '' : option.label || ''}
			value={value}
			onChange={(event: any, newValue: ISelectorItem | null) => {
				setValue(newValue);
				onChange(newValue?.value || '');
			}}
			inputValue={inputValue}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
				onChange(newInputValue || '');
			}}
			renderInput={(params) => (
				<TextField
					{...others}
					{...params}
					//InputProps={{...params.InputProps, type: 'search'}}
				/>
			)}
		/>
	);
});
