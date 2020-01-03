//

import React from 'react';

// Call #useRef() like useState().
export const useRefer = <T>(getInit: T | (() => T)): [T, (newValue: T) => any] => {
	// @ts-ignore
	const ctn = React.useRef(typeof getInit === 'function' ? getInit() : getInit);
	const setValue = (value: T) => ctn.current = value;
	return [ctn.current, setValue];
};
