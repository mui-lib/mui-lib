'use strict';

import React from 'react';
import {Dialog} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import IconClose from '@material-ui/icons/Close';
import {getResolvedOptions} from 'src/mui-lib/dialogs/helpers';
import {MuiDialogTitleBar} from 'src/mui-lib/layouts/MuiDialogTitleBar';
import {MuiAppBar} from '../layouts/MuiAppBar';
import {AdvancedTextField} from '../AdvancedTextField/AdvancedTextField';
import {FieldCheckbox} from '../FieldCheckbox/FieldCheckbox';
import {FieldSwitch} from '../FieldSwitch/FieldSwitch';
import {GroupedCheckboxes} from '../GroupedCheckboxes/GroupedCheckboxes';
import {SimpleEntityEditor} from '../SimpleEntityEditor/SimpleEntityEditor';
import {IEditorUpsertEntityProps, useUpsertEntity} from './useUpsertEntity';

// FIX-ME Fix the so much more props and provide a flexible visual interactions.
const DialogUpsertEntity = React.memo(<T extends object, P extends object, K>(props: IEditorUpsertEntityProps<T, P, K>) => {
	const {open, DialogProps, fields, getUpsertButtonLabel, labelButtonDelete} = props;
	const {isCreating, doDismissDialog} = props;

	const options = getResolvedOptions({isCreating}, DialogProps);

	const wrapper = useUpsertEntity(props);
	const {isPatchReady, entityPatch, theRealBaseEntity} = wrapper;
	const {onPatchChange, onFieldsRendered, onCreateEntity, onUpdateEntity, onDeleteEntity} = wrapper;

	const title = options.fullScreen || options.useTitleBar ? (
		options.fullScreen ? (
			<MuiAppBar
				title={options.title}
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
		) : (
			<MuiAppBar
				title={options.title}
				rightDom={options.useExitIcon ? (
					<IconButton color="inherit" onClick={doDismissDialog}>
						<IconClose/>
					</IconButton>
				) : undefined}
			/>
		)
	) : (
		options.useExitIcon ? (
			<MuiDialogTitleBar
				title={options.title}
				domExitButton={
					<IconButton color="inherit" onClick={doDismissDialog}>
						<IconClose/>
					</IconButton>
				}
			/>
		) : (
			<DialogTitle style={{textAlign: 'center'}}>{options.title}</DialogTitle>
		)
	);
	// USE APP BAR FOR FULL SCREEN DIALOG, WITH .
	return (
		<Dialog open={open} fullScreen={options.fullScreen} onClose={doDismissDialog} disableBackdropClick={options.useExitIcon} disableEscapeKeyDown={false}>
			{title}
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
				{isCreating || !onDeleteEntity || !labelButtonDelete ? undefined : <Button variant='contained' color='primary' disabled={isPatchReady} onClick={onDeleteEntity}>{labelButtonDelete}</Button>}
				<Button variant='contained' color='primary' disabled={!isPatchReady} onClick={isCreating ? onCreateEntity : onUpdateEntity}>{getUpsertButtonLabel(isCreating)}</Button>
			</DialogActions>
		</Dialog>
	);
});

export const getDialogUpsertEntity = <T extends object, P extends object, K>(): React.FC<IEditorUpsertEntityProps<T, P, K>> => DialogUpsertEntity;
