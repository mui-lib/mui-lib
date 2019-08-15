'use strict';

// Check if there are differences between the depended values.
// FIX-ME Distinguish the differences between undefined/null and empty [].
// FIX-ME Check the differences from the implementation of the official React library.
export const areDependedValuesDifferent = (oldDepends?: any[], newDepends?: any[]): boolean => {
	if (!newDepends || !oldDepends || oldDepends === newDepends) {return false;}
	for (let i = 0; i < oldDepends.length; i++) {
		// FIX-ME The depends are expected to be reset.
		if (oldDepends[i] !== newDepends[i]) {return true;}
	}
	// No difference is found!
	return false;
};

// MAY Implement with callback.
// Do something if there are differences between depended values.
// export const onDependsChanged = (callback: Function, oldDepends?: any[], newDepends?: any[]) => {
