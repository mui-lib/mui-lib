'use strict';

import React from 'react';
import {Dialog} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {AdvancedTextField} from '../editors/AdvancedTextField';
import {FieldCheckbox} from '../editors/FieldCheckbox';
import {FieldSingleSelector} from '../editors/FieldSingleSelector';
import {FieldSwitch} from '../editors/FieldSwitch';
import {GroupedCheckboxes} from '../editors/GroupedCheckboxes';
import {GroupedRadioButtons} from '../editors/GroupedRadioButtons';
import {SimpleEntityEditor} from '../editors/SimpleEntityEditor';
import {DialogUpsertEntityTitleBar} from '../layouts/DialogUpsertEntityTitleBar';
import {getResolvedUpsertOptions} from './helpers';
import {IEditorUpsertEntityProps, useUpsertEntity} from './useUpsertEntity';

// FIX-ME Fix the so much more props and provide a flexible visual interactions.
const DialogUpsertEntity = React.memo(<T extends object, P extends object, K>(props: IEditorUpsertEntityProps<T, P, K>) => {
	const {open, DialogProps, fields} = props;
	const {isCreating, doDismissDialog} = props;

	const {minWidth, labelUpsertButton, labelDeleteButton, ...options} = getResolvedUpsertOptions({isCreating}, DialogProps);

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
			<DialogContent style={{minWidth: minWidth}}>
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
					GroupedRadioButtons={GroupedRadioButtons}
					Selector={FieldSingleSelector}
				/>
			</DialogContent>
			<DialogActions>
				{isCreating || !onDeleteEntity || !labelDeleteButton ? undefined : <Button variant='contained' color='primary' disabled={isPatchReady} onClick={onDeleteEntity}>{labelDeleteButton}</Button>}
				<Button variant='contained' color='primary' disabled={!isPatchReady} onClick={onUpsertEntity}>{labelUpsertButton}</Button>
			</DialogActions>
		</Dialog>
	);
});

export const getDialogUpsertEntity = <T extends object, P extends object, K>(): React.FC<IEditorUpsertEntityProps<T, P, K>> => DialogUpsertEntity;
