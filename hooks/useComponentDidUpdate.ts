'use strict';

import * as React from 'react';
import {areDependedValuesDifferent} from 'src/zlib/mui-lib/hooks/utils';

// Do something with specific conditions except the first render.
// MAY BE USED TO Reset the State Recording to the Given Props
export const useComponentDidUpdate = (callback: Function, depends?: any[]) => {
	const ref = React.useRef<any[]>(depends || []);
	if (areDependedValuesDifferent(ref.current, depends)) {
		// Reset the depends.
		ref.current = depends || [];
		callback();
	}
};
