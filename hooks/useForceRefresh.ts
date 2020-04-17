//

import React from 'react';

export const useForceRefresh = () => {
	const [forceRefreshId, refresh] = React.useState(1);
	const doRefresh = () => {
		refresh(forceRefreshId + 1);
	};
	return [doRefresh];
};
