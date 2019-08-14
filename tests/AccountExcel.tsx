'use strict';

import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {IAccount} from './typed-accounts';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			marginTop: theme.spacing(3),
			overflowX: 'auto',
		},
		table: {
			minWidth: 650,
		},
	}),
);

interface IProps {
	accounts: IAccount[]
	onRowClicked: (account: IAccount) => any
}

export const AccountExcel = (props: IProps) => {
	const classes = useStyles();
	const {accounts, onRowClicked} = props;
	return (
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell align="center">Campus Card ID</TableCell>
					<TableCell align="center">Major</TableCell>
					<TableCell align="center">Email</TableCell>
					<TableCell align="center">Status</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{accounts.map(account => (
					<TableRow key={account.id} onClick={() => onRowClicked(account)}>
						<TableCell component="th" scope="row">{account.name}</TableCell>
						<TableCell align="center">{account.campusCardId}</TableCell>
						<TableCell align="center">{account.major}</TableCell>
						<TableCell align="center">{account.email}</TableCell>
						<TableCell align="center">{account.status}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};