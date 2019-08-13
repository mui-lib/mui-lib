'use strict';

import React from 'react';
import {Dialog} from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import {MuiAppBar} from '../layouts/MuiAppBar';
import {AdvancedTextField} from '../AdvancedTextField/AdvancedTextField';
import {FieldCheckbox} from '../FieldCheckbox/FieldCheckbox';
import {FieldSwitch} from '../FieldSwitch/FieldSwitch';
import {GroupedCheckboxes} from '../GroupedCheckboxes/GroupedCheckboxes';
import {IFieldDefinition} from '../SimpleEntityEditor/definitions';
import {SimpleEntityEditor} from '../SimpleEntityEditor/SimpleEntityEditor';

// Whether a patch is valid to be committed.
const isPatchEmpty = (patch: object): boolean => {
	if (!patch) {return true;}
	return JSON.stringify(patch) === '{}';
};

// The patches used for creation and modification may differ.
export interface IDialogEntityEditorProps<T extends object, P extends object, K> {
	open: boolean;
	fullScreen: boolean;
	title: string;
	// getTitle: (isCreating: boolean) => string;
	// domDialogTitleBar: React.ReactNode;
	description?: string;
	// domDialogDescription?: React.ReactNode;

	isCreating: boolean;
	baseEntity?: P;
	targetEntity?: T;
	targetEntityId?: K;

	getUnifiedEntity: (entity: T) => T;
	isResolvedEntityValid: (entity: T) => boolean;

	fields: IFieldDefinition[];
	// FIX-ME Required upsert.
	getUpsertButtonLabel: (isCreating: boolean) => string;
	doCreateEntity?: (patch: P) => any;
	doUpdateEntity?: (_id: K, patch: P) => any;
	// Optional deletion.
	labelButtonDelete?: string;
	doDeleteEntity?: (_id: K) => any;
	// Dismiss dialog.
	onDismissDialog: React.MouseEventHandler;
}

// Deconstruct from the real props to avoid conflict.
// base asset to create/update
// asset patch to create/update
// asset id to update
interface IResolvedProps<T extends object, P extends object> {
	theRealBaseEntity: T;
	initialAssetPatch: P;
}

const getResolvedProps = <T extends object, P extends object, K>(props: IDialogEntityEditorProps<T, P, K>): IResolvedProps<T, P> => {
	const {isCreating, baseEntity, targetEntity, getUnifiedEntity} = props;
	if (isCreating && baseEntity) {
		return {
			theRealBaseEntity: getUnifiedEntity({} as T), // FIX-ME Typing Elegantly.
			initialAssetPatch: {...baseEntity},
		};
	}
	if (!isCreating && targetEntity) {
		return {
			theRealBaseEntity: getUnifiedEntity(targetEntity),
			initialAssetPatch: {} as P,
		};
	}
	throw new Error('props given confliced');
};

export const TheDialogEntityEditor = React.memo(<T extends object, P extends object, K>(props: IDialogEntityEditorProps<T, P, K>) => {
	const {open, fullScreen, title, description, fields, getUpsertButtonLabel, labelButtonDelete} = props;
	const {isCreating, baseEntity, targetEntity, targetEntityId, isResolvedEntityValid} = props;
	const {doCreateEntity, doUpdateEntity, doDeleteEntity, onDismissDialog} = props;
	// Check the validity of the given props.
	if (isCreating && (!baseEntity)) {throw new Error('props given conflicted');}
	if (!isCreating && (!targetEntity || !targetEntityId)) {throw new Error('props given conflicted');}

	// The resolved props depend on the given props, and hence should change along with it.
	// Calculation would better be avoided.
	const [resolvedProps] = React.useState(() => getResolvedProps(props));
	const {theRealBaseEntity, initialAssetPatch} = resolvedProps;

	const [entityPatch, setEntityPatchState] = React.useState((): P => initialAssetPatch);

	const resolvedEntity = isCreating ? entityPatch as any as T : {...theRealBaseEntity, ...entityPatch};

	// Is the current patch ready to commit?
	const isPatchReady = isResolvedEntityValid(resolvedEntity) && !isPatchEmpty(entityPatch);

	// console.log('-->>', props, targetAssetId, baseEntity, initialAssetPatch, entityPatch, resolvedEntity, isPatchReady);

	const onCreateEntity = () => !isPatchReady || !doCreateEntity ? undefined : doCreateEntity(entityPatch);
	const onUpdateEntity = () => !isPatchReady || !targetEntityId || !doUpdateEntity ? undefined : doUpdateEntity(targetEntityId, entityPatch);
	// Deletion is disallowed because patch is pending to upsert.
	const onDeleteEntity = () => isPatchReady || !targetEntityId || !doDeleteEntity ? undefined : doDeleteEntity(targetEntityId);

	// const {title, description, updatedEntity, isCreating} = state;
	const onPatchChange = (patch: P) => setEntityPatchState({...patch});

	return (
		<Dialog open={open} fullScreen={fullScreen} onClose={onDismissDialog}>
			<MuiAppBar
				title={title}
				leftDom={
					<IconButton color="inherit" onClick={onDismissDialog}>
						<Close/>
					</IconButton>
				}
				rightDom={
					<Button color="inherit" onClick={isCreating ? onCreateEntity : onUpdateEntity}>
						{getUpsertButtonLabel(isCreating)}
					</Button>
				}
			/>
			<DialogContent>
				<br/>
				{description ? <DialogContentText>{description}</DialogContentText> : undefined}
				<SimpleEntityEditor
					onPatchChange={onPatchChange}
					entityFields={fields}
					entityPatch={entityPatch}
					targetEntity={theRealBaseEntity}
					TextField={AdvancedTextField}
					Checkbox={FieldCheckbox}
					Switch={FieldSwitch}
					GroupedCheckboxes={GroupedCheckboxes}
				/>
				<br/>
				<br/>
			</DialogContent>
			<DialogActions>
				{isCreating ? undefined : <Button variant='contained' color='primary' disabled={isPatchReady} onClick={onDeleteEntity}>{labelButtonDelete}</Button>}
				<Button variant='contained' color='primary' disabled={!isPatchReady} onClick={isCreating ? onCreateEntity : onUpdateEntity}>{getUpsertButtonLabel(isCreating)}</Button>
			</DialogActions>
		</Dialog>
	);
});
