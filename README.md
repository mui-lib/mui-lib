# Material UI Library

<!-- > 2018-06-04T13:12:15+0800 -->

A library of more complicated components for [material-ui](https://github.com/mui-org/material-ui) -- clone and use.

## Content

<!-- - Field Editors -->
- Entity Editors
	- Simple Entity Editor `<T extends object, P extends object, K = string>`
		- onPatchChange: `(patch: any) => void`
		- fields: `IFieldDefinition[]`
		- targetEntity: `ITargetEntity`
		- entityPatch: `object`
		- TextField: `React.ReactNode`
		- Checkbox?: `React.ReactNode`
		- Switch?: `React.ReactNode`
		- Selector?: `React.ReactNode`
		- GroupedCheckboxes?: `React.ReactNode`
		- TextFieldWithSuggestions?: `React.ReactNode`
	- Dialog Entity Editor
		- isCreating: `boolean`
		- baseEntity?: `P`
		- targetEntity?: `T`
		- fields: `IFieldDefinition[]`
		- doCreateEntity?: `(patch: P) => any`
		- doUpdateEntity?: `(_id: K, patch: P) => any`
		- doDeleteEntity?: `(_id: K) => any`
- Field Editors
	- Advanced Text Field
		- Extends `Standard Text Field Props`
	- Field Checkbox
		- Extends `Checkbox Field Props`
	- Field Switch
		- Extends `Switch Props`
	- Grouped Checkboxes
		- Extends `IEntityFieldWrapper` `IMultipleSelectorFieldProps`
- Dialogs
	- Button Dialog
		- title: `string`
		- content?: `string`
		- actions: `IButtonAction[]`
	- Dialog to Confirm
		- title: `string`
		- onConfirm: `() => any`
- Documents
	- [Dialog Entity Editor](Documents/Dialog-Entity-Editor.md)
- Hooks
	- useDerivedProps
		- getResolvedProps: `() => T`
		- depends?: `any[]`
- Layouts
	- MuiAppBar
		- title: `string`
		- domLeft?: `React Dom`
		- domRight?: `React Dom`
- Standalone
	- Countdown By Seconds
		- Seconds: `number`
