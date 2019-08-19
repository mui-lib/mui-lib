'use strict';

import React from 'react';
import {Dialog} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {getResolvedUpsertOptions} from '../dialogs/helpers';
import {AdvancedTextField} from '../AdvancedTextField/AdvancedTextField';
import {FieldCheckbox} from '../FieldCheckbox/FieldCheckbox';
import {FieldSwitch} from '../FieldSwitch/FieldSwitch';
import {GroupedCheckboxes} from '../GroupedCheckboxes/GroupedCheckboxes';
import {SimpleEntityEditor} from '../SimpleEntityEditor/SimpleEntityEditor';
import {DialogUpsertEntityTitleBar} from './DialogUpsertEntityTitleBar';
import {IEditorUpsertEntityProps, useUpsertEntity} from './useUpsertEntity';

// FIX-ME Fix the so much more props and provide a flexible visual interactions.
const DialogUpsertEntity = React.memo(<T extends object, P extends object, K>(props: IEditorUpsertEntityProps<T, P, K>) => {
	const {open, DialogProps, fields} = props;
	const {isCreating, doDismissDialog} = props;

	const {labelUpsertButton, labelDeleteButton, ...options} = getResolvedUpsertOptions({isCreating}, DialogProps);

	const wrapper = useUpsertEntity(props);
	const {isPatchReady, entityPatch, theRealBaseEntity} = wrapper;
	const {onPatchChange, onFieldsRendered, onUpsertEntity, onDeleteEntity} = wrapper;


	// USE APP BAR FOR FULL SCREEN DIALOG, WITH .
	return (
		<Dialog open={open} fullScreen={options.fullScreen} onClose={doDismissDialog} disableBackdropClick={options.useExitIcon} disableEscapeKeyDown={false}>
			<DialogUpsertEntityTitleBar
				{...options}
				labelUpsertButton={labelUpsertButton}
				doDismissDialog={doDismissDialog}
				onUpsertEntity={onUpsertEntity}
			/>
			<DialogContent>
				<br/>
				{options.domDescription}
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
				{isCreating || !onDeleteEntity || !labelDeleteButton ? undefined : <Button variant='contained' color='primary' disabled={isPatchReady} onClick={onDeleteEntity}>{labelDeleteButton}</Button>}
				<Button variant='contained' color='primary' disabled={!isPatchReady} onClick={onUpsertEntity}>{labelUpsertButton}</Button>
			</DialogActions>
		</Dialog>
	);
});

export const getDialogUpsertEntity = <T extends object, P extends object, K>(): React.FC<IEditorUpsertEntityProps<T, P, K>> => DialogUpsertEntity;
