'use strict';

// The functional values can be undefined.
const diff = (a: any, b: any): boolean => {
	return typeof a !== 'function' && typeof b !== 'function' && a !== b;
};

// Check the equality of the pure values between the prev props and next props.
// Btw, as the number of props should not be that more, no performance concerns needed of the checker.
export const arePropsPureValuesEqual = (prev: object, next: object): boolean => {
	let keys = Object.keys(prev);
	const m = new Map();
	for (let i = 0; i < keys.length; i++) {
		m[keys[i]] = true;
		if (diff(prev[keys[i]], next[keys[i]])) {return false;}
	}
	keys = Object.keys(next);
	for (let i = 0; i < keys.length; i++) {
		if (m[keys[i]]) {continue;}
		if (diff(prev[keys[i]], next[keys[i]])) {return false;}
	}
	return true;
};