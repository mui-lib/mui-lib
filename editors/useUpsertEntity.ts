'use strict';


import React from 'react';
import {useDerivedProps} from '../hooks/useDerivedProps';
import {IEnvironment, IFieldDefinition} from '../SimpleEntityEditor/definitions';
import {IDialogEntityEditorProps} from './IDialogEntityEditor';

// Whether a patch is valid to be committed.
const isPatchEmpty = (patch: object): boolean => {
	if (!patch) {return true;}
	return JSON.stringify(patch) === '{}';
};

// The patches used for creation and modification may differ.
export interface IEditorUpsertEntityProps<T extends object, P extends object, K = string> extends IDialogEntityEditorProps<T, P, K> {
	fullScreen: boolean;
	title: string;
	// getTitle: (isCreating: boolean) => string;
	// domDialogTitleBar: React.ReactNode;
	description?: string;
	// domDialogDescription?: React.ReactNode;
	targetEntityId?: K;

	getUnifiedEntity: (entity: T) => T;
	isResolvedEntityValid: (entity: T) => boolean;

	fields: IFieldDefinition[];
	// FIX-ME Required upsert.
	getUpsertButtonLabel: (isCreating: boolean) => string;
	// Optional deletion.
	labelButtonDelete?: string;
}

// Deconstruct from the real props to avoid conflict.
// base asset to create/update
// asset patch to create/update
// asset id to update
export interface IResolvedProps<T extends object, P extends object> {
	theRealBaseEntity: T;
	initialAssetPatch: P;
}

export const getDerivedProps = <T extends object, P extends object, K>(props: IEditorUpsertEntityProps<T, P, K>): IResolvedProps<T, P> => {
	const {isCreating, baseEntity, targetEntity, getUnifiedEntity} = props;
	if (isCreating && baseEntity) {
		return {
			theRealBaseEntity: getUnifiedEntity({} as T), // FIX-ME Typing Elegantly.
			initialAssetPatch: {...baseEntity},
		};
	}
	if (!isCreating && targetEntity) {
		return {
			theRealBaseEntity: getUnifiedEntity(targetEntity),
			initialAssetPatch: {} as P,
		};
	}
	throw new Error('props given conflicted');
};

// The util serves for *UpsertEntity* and takes care of the entity patch.
// Reused the logic parts of wrappers for entity editors to reduce the props required.
export const useUpsertEntity = <T extends object, P extends object, K = string>(props: IEditorUpsertEntityProps<T, P, K>) => {
	const {isCreating, baseEntity, targetEntity, targetEntityId, isResolvedEntityValid} = props;
	const {doCreateEntity, doUpdateEntity, doDeleteEntity} = props;
	// Check the validity of the given props.
	if (isCreating && (!baseEntity)) {throw new Error('props given conflicted');}
	if (!isCreating && (!targetEntity || !targetEntityId)) {throw new Error('props given conflicted');}

	// The resolved props depend on the given props, and hence should change along with it.
	const {theRealBaseEntity, initialAssetPatch} = useDerivedProps(() => getDerivedProps(props), [baseEntity, targetEntity]);
	// FIX-ME The patch should be reset when the [ target entry / base entry / open status ] changes.
	const [entityPatch, setEntityPatchState] = React.useState((): P => initialAssetPatch);
	const refEnv = React.useRef<IEnvironment | undefined>(undefined);
	let env = refEnv.current;
	// The final resolved entity, combining the patch upon the base.
	const resolvedEntity = isCreating ? entityPatch as any as T : {...theRealBaseEntity, ...entityPatch};
	// Is the current patch ready to commit?
	const isPatchReady = isResolvedEntityValid(resolvedEntity) && !isPatchEmpty(entityPatch);

	const onCreateEntity = () => !isPatchReady || !doCreateEntity ? undefined : (
		env && env.errorTexts.length > 0 ? alert(env.errorTexts[0]) : doCreateEntity(entityPatch)
	);
	const onUpdateEntity = () => !isPatchReady || !targetEntityId || !doUpdateEntity ? undefined : (
		env && env.errorTexts.length > 0 ? alert(env.errorTexts[0]) : doUpdateEntity(targetEntityId, entityPatch)
	);
	// Deletion is disallowed because patch is pending to upsert.
	const onDeleteEntity = () => isPatchReady || !targetEntityId || !doDeleteEntity ? undefined : doDeleteEntity(targetEntityId);
	// Patch Change > Render Fields(Check Errors) > Use Ref to Bind the Resolved Errors
	const onFieldsRendered = React.useCallback((_env: IEnvironment) => refEnv.current = env = _env, []);

	// const {title, description, updatedEntity, isCreating} = state;
	const onPatchChange = (patch: P) => setEntityPatchState({...patch});

	return {
		isPatchReady,
		theRealBaseEntity,
		entityPatch,

		onPatchChange,
		onFieldsRendered,

		onCreateEntity,
		onUpdateEntity,
		onDeleteEntity,
	};
};
