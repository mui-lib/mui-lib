'use strict';

import React from 'react';

type StateSetterAction<IState> = (state: IState) => IState
type SetStateAction<IState> = IState | StateSetterAction<IState>

// Initialize state and reset state with specific conditions.
// MAY BE USED TO Get the derived state from the context(props/states) depends on context(props/states).
export const useDerivedStateFromProps = <IState>(getDerivedState: () => IState, depends?: any[]): [IState, (state: SetStateAction<IState>) => any] => {
	// Use a ref to mock the real state.
	const ref = React.useRef<IState>({} as any as IState);
	React.useMemo(() => {
		// Calculate the state the first time and every time the depends changes.
		ref.current = getDerivedState();
	}, depends);
	if (!ref.current) {ref.current = getDerivedState();}

	const doForceRender = React.useState<any>()[1];
	const setState = (state: SetStateAction<IState>) => {
		if (typeof state === 'object') {
			ref.current = state;
		} else if (typeof state === 'function') {
			const setStateAction: StateSetterAction<IState> = state as StateSetterAction<IState>;
			ref.current = setStateAction(ref.current);
		}
		doForceRender(state);
	};

	return [ref.current, setState];
};
