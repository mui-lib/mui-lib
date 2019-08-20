'use strict';

import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import IconClose from '@material-ui/icons/Close';
import {MuiDialogTitleBar} from './MuiDialogTitleBar';
import {MuiAppBar} from './MuiAppBar';

interface IProps {
	fullScreen?: boolean;
	useExitIcon?: boolean;
	useTitleBar?: boolean;
	title: string;
	labelUpsertButton: string;
	doDismissDialog: React.MouseEventHandler;
	onUpsertEntity: React.MouseEventHandler;
}

export const DialogUpsertEntityTitleBar = (props: IProps) => {
	const {fullScreen, useTitleBar, useExitIcon, title, labelUpsertButton, onUpsertEntity, doDismissDialog} = props;
	if (fullScreen || useTitleBar) {
		return fullScreen ? (
			<MuiAppBar
				title={title}
				leftDom={
					<IconButton color="inherit" onClick={doDismissDialog}>
						<IconClose/>
					</IconButton>
				}
				rightDom={
					<Button color="inherit" onClick={onUpsertEntity}>
						{labelUpsertButton}
					</Button>
				}
			/>
		) : (
			<MuiAppBar
				title={title}
				rightDom={useExitIcon ? (
					<IconButton color="inherit" onClick={doDismissDialog}>
						<IconClose/>
					</IconButton>
				) : undefined}
			/>
		);
	}
	return useExitIcon ? (
		<MuiDialogTitleBar
			title={title}
			domExitButton={
				<IconButton color="inherit" onClick={doDismissDialog}>
					<IconClose/>
				</IconButton>
			}
		/>
	) : (
		<DialogTitle style={{textAlign: 'center'}}>{title}</DialogTitle>
	);
};