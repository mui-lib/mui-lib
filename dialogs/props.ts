/**
 * The resolved/unified( and corrected if needed) props by definitions to customize the final components rendered.
 */

'use strict';

import * as React from 'react';

interface IResolvedDialog {
	fullScreen?: boolean;
	minWidth?: string;
}

interface IResolvedDialogTitle {
	useTitleBar?: boolean;
	useExitIcon?: boolean;
	title: string; // | React.ReactNode
}

interface IResolvedDialogDescription {
	domDescription?: React.ReactNode;
}

export interface IResolvedDialogProps extends IResolvedDialog, IResolvedDialogTitle, IResolvedDialogDescription {}

interface IResolvedDialogUpsertAction {
	labelUpsertButton: string;
}

interface IResolvedDialogDeleteAction {
	labelDeleteButton?: string;
}

// Dialog to upsert/delete entities.
export interface IResolvedUpsertDialogDefinition extends IResolvedDialogProps, IResolvedDialogUpsertAction, IResolvedDialogDeleteAction {}
