'use strict';

import React from 'react';
import {Button} from '@material-ui/core';
import {getDialogUpsertEntity} from '../editors/DialogUpsertEntity';
import {IDialogEntityEditorProps} from '../editors/IDialogEntityEditor';
import {AccountExcel} from './AccountExcel';
import {AccountUtil, IAccount, IAccountBody, IAccountPatch} from './typed-accounts';
import {fields as _fields, RAccount} from './resources';

const TheDialogUpsertAccount = getDialogUpsertEntity<IAccount, IAccountPatch, string>();

const fields = [_fields.name, _fields.major, _fields.email];

interface IProps extends IDialogEntityEditorProps<IAccount, IAccountPatch, string> {

}

export const DialogUpsertAccount = (props: IProps) => {
	const {isCreating, baseEntity, targetEntity, ...others} = props;
	return (
		<TheDialogUpsertAccount
			{...others}
			isCreating={isCreating} baseEntity={baseEntity}
			targetEntity={targetEntity} targetEntityId={targetEntity ? targetEntity.id : undefined}
			fullScreen={false} title={RAccount.getDialogTitle(isCreating)}
			getUnifiedEntity={AccountUtil.getUnifiedAccount}
			isResolvedEntityValid={AccountUtil.isAccountPatchValid}
			fields={fields}
			getUpsertButtonLabel={RAccount.getSubmitButtonLabel}
		/>
	);
};

interface IState {
	dialogSwitch: boolean;
	accounts: IAccount[];
	targetAccount?: IAccount;
	newAccount?: IAccountPatch | IAccountBody;
}

export const DialogDemoAccount = React.memo((props: {}) => {
	const [state, setState] = React.useState((): IState => ({
		dialogSwitch: false,
		accounts: [],
	}));

	const {dialogSwitch, accounts, targetAccount, newAccount} = state;

	const doCreateEntity = (body: IAccountPatch) => {
		const _account = AccountUtil.newFakeAccount(body as IAccountBody);
		setState((state) => ({...state, dialogSwitch: false, accounts: [...state.accounts, _account]}));
	};

	const doUpdateEntity = (id: string, patch: IAccountPatch) => {
		let target = accounts.find(account => account.id === id);
		if (!target) {return;}
		const _old = accounts.filter(account => account.id !== id);
		_old.push({...target, ...patch});
		setState({...state, dialogSwitch: false, accounts: _old});
	};

	const renderDialog = () => dialogSwitch && (newAccount || targetAccount) ? (
		<DialogUpsertAccount
			open={dialogSwitch}
			isCreating={Boolean(newAccount)} baseEntity={newAccount} targetEntity={targetAccount}
			doCreateEntity={doCreateEntity}
			doUpdateEntity={doUpdateEntity}
			doDismissDialog={() => setState({...state, dialogSwitch: false, newAccount: undefined, targetAccount: undefined})}
		/>
	) : undefined;

	return (
		<div>
			<AccountExcel
				accounts={accounts}
				onRowClicked={(account) => setState({...state, dialogSwitch: true, newAccount: undefined, targetAccount: account})}
			/>
			<div style={{height: 16}}/>
			<Button
				variant='contained' color='primary'
				onClick={() => setState({...state, dialogSwitch: true, newAccount: {campusCardId: `${Math.floor(Math.random() * 100000000)}`, name: ''}, targetAccount: undefined})}
			>
				New Account
			</Button>
			{renderDialog()}
		</div>
	);
});

