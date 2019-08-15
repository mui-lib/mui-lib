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
    - useComponentDidUpdate
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

> [Ref:](https://reactjs.org/docs/hooks-intro.html#its-hard-to-reuse-stateful-logic-between-components)
> Hooks allow you to reuse stateful logic without changing your component hierarchy.

Hooks are powerful and reusable.
Hence kinds of hooks can be combined in various ways to do corresponding powerful magics.

### 1. React Life-cycles and their Use Cases

<!-- > 2019-08-15T21:25:29+0800 -->

The hooks 101 is to imitate the whole life-cycles of the class components do.
The instructions for references are shown below:

#### Mounting:

- Will Mount `useState(()=>state)`
	- Set state on mount and before the first render.
	- IS USED TO Set the initial state.
	- MAY BE USED TO Calculate the first state from props perhaps.
- Did Mount `useEffect(callback, [])`
	- Do something with specific conditions after the first render.
	- MAY BE USED TO Subscribes resources.
	- MAY BE USED TO Asynchronously fetch resources required.

#### Updating

- Get Derived State From Props `useDerivedProps(()=>T, depends): T`
	- Do some heavy calculations with specific conditions.
	- MAY BE USED TO Get derived ref(values) from props and state.
		- Get the synchronous state from source props and state.
- Did Update `useComponentDidUpdate(callback, depends)`
	- Do something with specific conditions except the first render.
	- MAY BE USED TO Reset the state recording to the given props.
- After Render `useEffect(callback)`
	- Do something after each and every renders.
	- MAY BE USED TO Check state to fetch asynchronously resources and hence to update the state.
		- Check the current state and do asynchronous work if needed.
		- It may cause some strange state/behavior if the state is altered synchronous here.
		- For better performance, the particular patch of state may be sync in need.

#### Unmounting

- Will Unmount `useEffect(()=>callback, [])`
	- Do something with specific conditions when unmount.
	- MAY BE USED TO Unsubscribes resources.

### 2. Hooks Implementations

- useComponentDidUpdate
	- callback: `Function`
	- depends?: `any[]`
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
