'use strict';

import React from 'react';

// The props( except the definitions) required by the outer layer.
export interface IDialogEntityEditorProps<T extends object, P extends object, K = string> {
	open: boolean;
	isCreating: boolean;
	baseEntity?: P;
	targetEntity?: T;

	doCreateEntity?: (patch: P) => any;
	doUpdateEntity?: (_id: K, patch: P) => any;
	doDeleteEntity?: (_id: K) => any;
	doDismissDialog: React.MouseEventHandler;
}
