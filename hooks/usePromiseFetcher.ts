//

import React from 'react';
import {IFetcher, useFetcher} from './useFetcher';

// By default, will trigger the async promise directly; provide a #doRefresh API to refresh data.
// FIX-ME No update/setState when the component unmount.
export const usePromiseFetcher = <T, E = Error>(doFetch: () => Promise<T>, notFetching?: boolean): [IFetcher<T, E>, (noBlinking?: boolean) => any] => {
	const [fetcher, fetched, refreshing] = useFetcher<T, E>(notFetching);
	const doRefresh = (noBlinking?: boolean) => {
		if (!noBlinking) {refreshing();}
		// console.log('refreshing/noBlinking', noBlinking);
		doFetch().then(assets => {
			fetched(assets);
			// console.log('fetched(assets);', assets);
		}).catch(ex => {
			fetched(undefined, ex);
			// console.log('failed to fetch:', ex);
		});
	};
	React.useEffect(() => {
		if (notFetching) {return;}
		doRefresh(true);
	}, []);
	return [fetcher, doRefresh];
};
