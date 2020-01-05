//

import React from 'react';
import {IFetcher, useFetcher} from './useFetcher';

// By default, will trigger the async promise directly; provide a #doRefresh API to refresh data.
export const usePromiseFetcher = <T, E = Error>(doFetch: () => Promise<T>, depends: any[] = [], notFetching?: boolean): [IFetcher<T, E>, (noBlinking?: boolean) => any] => {
	const ref = React.useRef(true);
	const [fetcher, fetched, refreshing] = useFetcher<T, E>(notFetching);
	// console.log('updating fetcher:', fetcher);
	const doRefresh = (noBlinking?: boolean) => {
		if (!noBlinking) {refreshing();}
		// console.log('refreshing/noBlinking', noBlinking);
		doFetch().then(assets => {
			// No update/setState call for unmount components.
			ref.current && fetched(assets);
			// console.log('fetched(assets);', assets);
			return assets;
		}).catch(ex => {
			ref.current && fetched(undefined, ex);
			// console.log('failed to fetch:', ex);
			// Here, the exception hence is swallowed.
			// return ex;
		});
	};
	React.useEffect(() => {
		// FIX-ME Cancel the request of same component with different dependencies.
		if (ref.current) {
			// Initialization of the Target Component
			// Should not update state again, during the initialization process of the target component.
			if (!notFetching) {doRefresh(true);}
		} else {
			// Reset of the Target Component, Requested by Dependencies
			ref.current = true;
			// Should reset the fetcher explicitly, because the current fetcher holds an incorrect cache.
			doRefresh();
		}
		return () => {ref.current = false;};
	}, depends);
	return [fetcher, doRefresh];
};
