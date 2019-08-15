'use strict';

import React from 'react';

interface IRefNoDuplicateRenders<T> {
	depends?: any[];
	value: T
}

// Calculate something and cache within the Function Components using React hooks.
// MAY BE USED TO Get the derived props from the context(props/states) depends on context(props/states).
export const useDerivedProps = <T>(getResolvedProps: () => T, depends?: any[]): T => {
	const ref = React.useRef<IRefNoDuplicateRenders<T>>();
	// Calculate the resolved props the first time.
	if (!ref.current) {ref.current = {depends: depends, value: getResolvedProps()};}
	// Re-calculate the resolved props the following every time it changes.
	// May use the React#useEffect to detect the changes of the depends list.
	depends && ref.current.depends && ref.current.depends !== depends && ref.current.depends.find((value, index) => {
		if (depends[index] !== value) {
			if (!ref.current) {return true;}
			// Reset the depends.
			ref.current.depends = depends;
			ref.current.value = getResolvedProps();
			return true;
		}
		return false;
	});
	// Consider return the ref itself to export more data.
	return ref.current.value;
};

// Implement with the #useEffect.
// React.useEffect(() => {
// 	// Will be calculated twice.
// 	// Should not be calculated for the first time.
// 	// Should be pre-calculated instead of post-calculated.
// 	ref.current = getResolvedProps();
// }, depends);
