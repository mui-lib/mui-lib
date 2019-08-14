'use strict';

import React from 'react';
import {Dialog} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import IconClose from '@material-ui/icons/Close';
import {MuiAppBar} from '../layouts/MuiAppBar';
import {AdvancedTextField} from '../AdvancedTextField/AdvancedTextField';
import {FieldCheckbox} from '../FieldCheckbox/FieldCheckbox';
import {FieldSwitch} from '../FieldSwitch/FieldSwitch';
import {GroupedCheckboxes} from '../GroupedCheckboxes/GroupedCheckboxes';
import {SimpleEntityEditor} from '../SimpleEntityEditor/SimpleEntityEditor';
import {IEditorUpsertEntityProps, useUpsertEntity} from './useUpsertEntity';

// FIX-ME Fix the so much more props and provide a flexible visual interactions.
const DialogUpsertEntity = React.memo(<T extends object, P extends object, K>(props: IEditorUpsertEntityProps<T, P, K>) => {
	const {open, fullScreen, title, description, fields, getUpsertButtonLabel, labelButtonDelete} = props;
	const {isCreating, doDismissDialog} = props;

	const wrapper = useUpsertEntity(props);
	const {isPatchReady, entityPatch, theRealBaseEntity} = wrapper;
	const {onPatchChange, onFieldsRendered, onCreateEntity, onUpdateEntity, onDeleteEntity} = wrapper;

	return (
		<Dialog open={open} fullScreen={fullScreen} onClose={doDismissDialog}>
			<MuiAppBar
				title={title}
				leftDom={
					<IconButton color="inherit" onClick={doDismissDialog}>
						<IconClose/>
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
					onFieldsRendered={onFieldsRendered}
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
				{isCreating || !onDeleteEntity || !labelButtonDelete ? undefined : <Button variant='contained' color='primary' disabled={isPatchReady} onClick={onDeleteEntity}>{labelButtonDelete}</Button>}
				<Button variant='contained' color='primary' disabled={!isPatchReady} onClick={isCreating ? onCreateEntity : onUpdateEntity}>{getUpsertButtonLabel(isCreating)}</Button>
			</DialogActions>
		</Dialog>
	);
});

export const getDialogUpsertEntity = <T extends object, P extends object, K>(): React.FC<IEditorUpsertEntityProps<T, P, K>> => DialogUpsertEntity;
