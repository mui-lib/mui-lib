//

import React from 'react';

interface IProps<Key> {
	// The current tab selected.
	tab: Key;
	// How many pages are there.
	total: number;
	// Render the corresponding view of the target tab and cache.
	// The target view will not be remounted on switching between tabs.
	getPanelView: (tab: Key) => React.ReactNode;
}

// A FrameLayout component, hide and show tabs following external selections, with the lazy-loading feature.
export const TabsRouter = React.memo(({tab, total, getPanelView}: IProps<number>) => {
	// Mark the visited tabs and update the visited tabs following #currentTabIndex.
	// > You can also implement with a #setState() on your will.
	const theVisitedTabs = React.useRef<{}>({});
	theVisitedTabs.current[tab] = true;

	// The real tabs panels will be lazy-loaded(initialized on demand).
	return (
		<div>
			{new Array(total).fill(0).map((item, index) => theVisitedTabs.current[index] ? (
				<div key={index} style={{display: tab === index ? undefined : 'none'}}>
					{getPanelView(index)}
				</div>
			) : undefined)}
		</div>
	);
});

