//

import React from 'react';
import {IFetcher, useFetcher} from './useFetcher';

interface IFetcherRefer {
	active: boolean;
}

// By default, will trigger the async promise directly; provide a #doRefresh API to refresh data.
export const usePromiseFetcher = <T, E = Error>(doFetch: () => Promise<T>, depends: any[] = [], notFetching?: boolean): [IFetcher<T, E>, (noBlinking?: boolean) => any] => {
	const ref = React.useRef(true);
	const [fetcher, fetched, refreshing] = useFetcher<T, E>(notFetching);
	// console.log('updating fetcher:', fetcher);
	const doRefresh = (noBlinking?: boolean): IFetcherRefer => {
		if (!noBlinking) {refreshing();}
		// console.log('refreshing/noBlinking', noBlinking);
		const _ref: IFetcherRefer = {active: true};
		doFetch().then(assets => {
			// ref: No update/setState call for unmount components.
			// _ref: No update/setState call for expired requests.
			ref.current && _ref.active && fetched(assets);
			// console.log('fetched(assets);', assets);
			return assets;
		}).catch(ex => {
			ref.current && _ref.active && fetched(undefined, ex);
			// console.log('failed to fetch:', ex);
			// Here, the exception hence is swallowed.
			// return ex;
		}).catch(() => {
			// Terminate the lifecycle of the current fetcher.
			_ref.active = false;
		});
		return _ref;
	};
	React.useEffect(() => {
		// FIX-ME Cancel the request of same component with different dependencies.
		let _ref: IFetcherRefer | undefined;
		if (ref.current) {
			// Initialization of the Target Component
			// Should not update state again, during the initialization process of the target component.
			if (!notFetching) {_ref = doRefresh(true);}
		} else {
			// Reset of the Target Component, Requested by Dependencies
			ref.current = true;
			// Should reset the fetcher explicitly, because the current fetcher holds an incorrect cache.
			_ref = doRefresh();
		}
		return () => {
			ref.current = false;
			if (_ref) {_ref.active = false;}
		};
	}, depends);
	return [fetcher, doRefresh];
};
