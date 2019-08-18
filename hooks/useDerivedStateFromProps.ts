'use strict';

import React from 'react';

type StateSetterAction<IState> = (state: IState) => IState
// @see https://stackoverflow.com/questions/39713349/make-all-properties-within-a-typescript-interface-optional
type SetStateAction<IState> = Partial<IState> | StateSetterAction<IState>

// Initialize state and reset state with specific conditions.
// MAY BE USED TO Get the derived state from the context(props/states) depends on context(props/states).
export const useDerivedStateFromProps = <IState>(getDerivedState: () => IState, depends?: any[]): [IState, (state: SetStateAction<IState>) => any] => {
	// Use a ref to mock the real state.
	const ref = React.useRef<IState>({} as any as IState);
	React.useMemo(() => {
		// Calculate the state the first time and every time the depends changes.
		ref.current = getDerivedState();
	}, depends);

	const doForceRender = React.useState<any>()[1];
	const setState = (state: SetStateAction<IState>) => {
		if (typeof state === 'object' && !Array.isArray(state)) {
			// FIX-ME Auto merge the state like the *Class Components* do.
			// @see https://reactjs.org/docs/hooks-reference.html#functional-updates
			ref.current = {...ref.current, ...state};
		} else if (typeof state === 'function') {
			const setStateAction: StateSetterAction<IState> = state as StateSetterAction<IState>;
			ref.current = setStateAction(ref.current);
		} else {
			ref.current = state as any as IState;
		}
		doForceRender(state);
	};

	return [ref.current, setState];
};
