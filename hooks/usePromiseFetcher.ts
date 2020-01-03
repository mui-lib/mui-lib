//

import React from 'react';
import {IFetcher, useFetcher} from './useFetcher';
import {useRefer} from './useRefer';

// By default, will trigger the async promise directly; provide a #doRefresh API to refresh data.
export const usePromiseFetcher = <T, E = Error>(doFetch: () => Promise<T>, notFetching?: boolean): [IFetcher<T, E>, (noBlinking?: boolean) => any] => {
	const [isAlive, setAlive] = useRefer(true);
	const [fetcher, fetched, refreshing] = useFetcher<T, E>(notFetching);
	const doRefresh = (noBlinking?: boolean) => {
		if (!noBlinking) {refreshing();}
		// console.log('refreshing/noBlinking', noBlinking);
		doFetch().then(assets => {
			// No update/setState call for unmount components.
			isAlive && fetched(assets);
			// console.log('fetched(assets);', assets);
			return assets;
		}).catch(ex => {
			isAlive && fetched(undefined, ex);
			// console.log('failed to fetch:', ex);
			// Here, the exception hence is swallowed.
			// return ex;
		});
	};
	React.useEffect(() => {
		if (!notFetching) {doRefresh(true);}
		return () => {setAlive(false);};
	}, []);
	return [fetcher, doRefresh];
};
