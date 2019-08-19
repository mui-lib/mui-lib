/**
 * The resolved/unified( and corrected if needed) props by definitions to customize the final components rendered.
 */

'use strict';

import * as React from 'react';

interface IResolvedDialog {
	fullScreen?: boolean;
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
