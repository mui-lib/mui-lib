/**
 * The definitions to define and customize dialogs by declarations.
 * Kinds of dialogs differ from contents as well as styles.
 * Trying to make the styles singleton while the content various.
 */

'use strict';

import * as React from 'react';

type GetUpsertString = (isCreating: boolean) => string

interface IBaseConfigure {
	fullScreen?: boolean;
	minWidth?: string;
}

interface IBaseTitle {
	useTitleBar?: boolean;
	useExitIcon?: boolean;
	title: string;
}

interface IBaseDescription {
	description?: string;
	domDescription?: React.ReactNode;
}

// The configurations and definitions for a basic dialog.
export interface IBaseDialogDefinition extends IBaseConfigure, IBaseTitle, IBaseDescription {}

// FIX-ME Duplicated declarations.
interface IUpsertTitle extends Partial<IBaseTitle> {
	getTitle?: (isCreating: boolean) => string;
}

interface IUpsertDescription extends IBaseDescription {
	getDescription?: (isCreating: boolean) => string;
}

interface IButtonUpsert {
	labelUpsertButton?: string;
	getUpsertButtonLabel?: GetUpsertString;
}

interface IButtonDelete {
	labelDeleteButton?: string;
}

// Dialog to upsert/delete entities.
export interface IUpsertDialogDefinition extends IBaseConfigure, IUpsertTitle, IUpsertDescription, IButtonUpsert, IButtonDelete {}

interface IButtonConfirm {
	labelConfirmButton: string;
}

interface IButtonCancel {
	// If being set, the dialog will be #disableBackdropClick.
	labelCancelButton?: string;
}

// Dialog used to Confirm/Cancel tasks.
// FIX-ME Extends required props only.
export interface IConfirmDialogDefinition extends IBaseDialogDefinition, IButtonConfirm, IButtonCancel {}

export interface IDialogActionButton {
	label: string;
	options?: object;
	onClick: React.MouseEventHandler;
}
