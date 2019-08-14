'use strict';

// IEntityName, IEntityPatch, IEntityBody
// The #IEntityPatch is valid if as long as the resolved entity is valid?
// The #IEntityBody is valid, also as long as the resolved entity is valid?
// Is the entity valid to delete?
export interface IAccount {
	id: string;
	// Required
	name: string;
	campusCardId: string;
	// Optional
	grade?: string;
	major?: string;
	email?: string;
	status?: string;
}

export interface IAccountPatch {
	name?: string;
	grade?: string;
	major?: string;
	email?: string;
	status?: string;
}

// Required to create account.
export interface IAccountBody extends IAccountPatch {
	name: string;
	campusCardId: string;
}

const getUnifiedAccount = ({grade, major, email, status, ...others}: IAccount): IAccount => ({
	...others,
	grade: grade || '',
	major: major || '',
	email: email || '',
	status: status || '',
});

const isAccountPatchValid = ({name, campusCardId}: IAccount): boolean => {
	if (!name || !campusCardId) {return false;}
	//
	return true;
};

const newFakeAccount = ({name, campusCardId, ...account}: IAccountBody): IAccount => {
	if (!name || !campusCardId) {throw new Error('Failed to create account!');}
	return {
		...account,
		id: `${Math.floor(Math.random() * 100000000)}`,
		name: name,
		campusCardId: campusCardId,
	};
};

export const AccountUtil = {
	newFakeAccount,
	getUnifiedAccount,
	isAccountPatchValid,
};