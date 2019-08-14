# Material UI Library

<!-- > 2018-06-04T13:12:15+0800 -->

A library of more complicated components for [material-ui](https://github.com/mui-org/material-ui) -- clone and use.

## Content

- Editors
	- Entity Editors
		- Simple Entity Editor
		- Dialog Entity Editor
	- Field Editors
		- Advanced Text Field
		- Field Checkbox
		- Field Switch
		- Grouped Checkboxes
- Dialogs
	- Button Dialog
	- Dialog to Confirm
- Hooks
	- useDerivedProps
- Layouts
	- Mui App Bar
- Standalone
	- Countdown By Seconds

## Editors

Assets Manager >
Dialog/Panel Upsert Entity >
Entity Editor > Field Editor >
Label + Placeholder + Helper Text(with Error Checker)

- Dialog Upsert Entity

	 Used to
	 1\. compose an entity body to create an instance of the specific resource
	 2\. compose an entity patch to update the target resource;
	 3\. confirm to delete an entity;

	 Takes care of the entity body/patch and serves for the outer assets manager.

	- [Dialog Upsert Entity](Documents/Dialog-Upsert-Entity.md)
		- isCreating: `boolean`
		- baseEntity?: `P`
		- targetEntity?: `T`
		- fields: `IFieldDefinition[]`
		- doCreateEntity?: `(patch: P) => any`
		- doUpdateEntity?: `(_id: K, patch: P) => any`
		- doDeleteEntity?: `(_id: K) => any`
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
- Field Editors
	- Advanced Text Field
		- Extends `Standard Text Field Props`
	- Field Checkbox
		- Extends `Checkbox Field Props`
	- Field Switch
		- Extends `Switch Props`
	- Grouped Checkboxes
		- Extends `IEntityFieldWrapper` `IMultipleSelectorFieldProps`

## Dialogs

> [Ref:](https://material.io/design/components/dialogs.html)
> Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.

- Button Dialog
	- title: `string`
	- content?: `string`
	- actions: `IButtonAction[]`
- Dialog to Confirm
	- title: `string`
	- onConfirm: `() => any`

## Hooks

- useDerivedProps
	- getResolvedProps: `() => T`
	- depends?: `any[]`

## Layouts

- MuiAppBar
	- title: `string`
	- domLeft?: `React Dom`
	- domRight?: `React Dom`

## Standalone

- Countdown By Seconds
	- Seconds: `number`
