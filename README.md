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
	- Dialog with Action Buttons
	- Dialog to Confirm Button
- Hooks
	- useComponentDidUpdate(callback, depends)
	- useDerivedProps(getResolvedProps, depends): `T` = React.useMemo
    - useDerivedStateFromProps(getDerivedState, depends): `[IState, setState]`
- Hooks Utilities
	- arePropsPureValuesEqual(prevProps, nextProps): `boolean`
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

- Dialog with Action Buttons
	- title: `string`
	- content?: `string`
	- actions: `IButtonAction[]`
- Dialog to Confirm Button
	- title: `string`
	- onConfirm: `() => any`

> The Design Principle: Easy to Use while Powerful to Customize. --Fisher

Complex dialogs, the dialogs containing complex components,
tend to be dismissed explicitly with cautions,
or they can be full-screen to gather the full attentions.

While simple dialogs, on the contrary,
are okay to be easily dismissed,
worked as real/normal dialogs.

Hence a dialog can have the following default and customizable configurations:

- Normal Dialogs
	- `Use App Bar` Whether to use a app bar. `optional`
		- Do Centralize and Bold Title if No App Bar
	- Centralize Title `to-be-supported`
	- `Exit Icon` on the Right Corner `optional`
		- Be Cautious to Dismiss Dialog
	- Cautious `to-be-supported`
- Full-screen Dialogs
	- Use App Bar By default
	- `Title` inside the App Bar Aligned on the Left
	- `Exit Icon/Button` inside the App Bar on the Left
	- `Confirm Icon/Button` inside the App Bar on the Right

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

- Get Derived State From Props `useMemo(()=>T, depends): T`
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

- useComponentDidUpdate(callback, depends)
	- callback: `Function`
	- depends?: `any[]`
- useDerivedProps(getResolvedProps, depends): `T` = React.useMemo
	- getResolvedProps: `() => T`
	- depends?: `any[]`
- useDerivedStateFromProps(getDerivedState, depends): `[IState, setState]`
	- getDerivedState: `() => IState`
	- depends?: `any[]`

### 2.b Hooks Utilities

- arePropsPureValuesEqual(prevProps, nextProps): `boolean`
	- prevProps: `object`
	- nextProps: `object`

### 3. Performance Optimizations

> Ref: https://reactjs.org/docs/optimizing-performance.html

The strategies and procedures practiced to optimize performance are often as coding guidelines/conventions to write bug-free and clean codes.

#### Use Ref as State

State are kind of ref but the values are often revealed to views.

If ref values are used instead of state, asynchronous modifications should be noticed while synchronous modifications should not to avoid duplicated renders.

- useDerivedStateFromProps(getDerivedState, depends): `[IState, setState]`
	- getDerivedState: `() => IState`
	- depends?: `any[]`
- Use Derived State From Props
	- Initialize state and reset state with specific conditions.
	- MAY BE USED TO Get the derived state from the context(props/states) depends on context(props/states).
	- MAY BE USED TO Substitute the React#useState.

#### Pure Component vs. React.memo

> Ref: https://reactjs.org/docs/react-api.html#reactmemo
>
> [Ref:](https://reactjs.org/docs/hooks-reference.html#usememo)
Conceptually, though, that’s what they represent:
every value referenced inside the function should also appear in the dependencies array.
In the future, a sufficiently advanced compiler could create this array automatically.

They are claimed to be the same and it seems to be so!

What makes the differences is that,
the props containing actions(functions) passed to `Functional Components` and `Pure Component` are slightly different,
as the actions for `Pure Component` are usually constant while the ones for `Functional Component` are designed to be changing between renders.

A function utility may be implemented
to check the differences of values inside props,
and ignore the differences of functional actions(having type of *function*) inside props,
between the previous props and the next props.

- arePropsPureValuesEqual(prevProps, nextProps): `boolean`

Furthermore, the target component should be updated when the values of the props changed.
The same way, the depended values are usually the same set by `#useDerivedStateFromProps()`.
Hence the solutions could be more generalized and open.

## Layouts

- MuiAppBar
	- title: `string`
	- domLeft?: `React Dom`
	- domRight?: `React Dom`

## Standalone

- Countdown By Seconds
	- Seconds: `number`
