import React from 'react';

// Usage: const doRefresh = useForceRefresh();
export const useForceRefresh = () => {
	const [forceRefreshId, refresh] = React.useState(1);
	return () => refresh(forceRefreshId + 1);
};
