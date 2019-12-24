//

import React from 'react';

// The default Placeholder string.
const phd = {
	initial: 'Init/Reset',
	initializing: 'Loading...',
	refreshing: 'Refreshing...',
	empty: 'Fetched empty data!',
	succeeded: 'Fetched data successfully!',
	failed: 'Failed to load data!',
};

export const $setPlaceholderStrings = ({initial, initializing, refreshing, empty, succeeded, failed}: Partial<typeof phd>) => {
	phd.initial = initial || phd.initial;
	phd.initializing = initializing || phd.initializing;
	phd.refreshing = refreshing || phd.refreshing;
	phd.empty = empty || phd.empty;
	phd.succeeded = succeeded || phd.succeeded;
	phd.failed = failed || phd.failed;
};

// Support 5 states:
//
// 0. Reset
//     A. Initial
//     B. Reset
// 1. Loading
//     A. Initializing
//     B. Refreshing
// 2. Fetched
//     A. Empty Data
//     B. Non-empty Data
// 3. Failed
//     A. Error
//     B. Timeout
//     C. Network
//     D. Not Found
export interface IFetcher {
	loading: boolean;
	initializing: boolean;
	data?: any;
	error?: any;
	message: string;
}

const initial: IFetcher = {
	loading: false, // The loading state, can be animated with a progress indicator if true.
	initializing: true, // The initial request, if is loading and true.
	data: undefined, // The requested and cached data.
	error: undefined, // The requested and cached exception.
	message: phd.initial, // The description of the fetcher, may be used as the simplified placeholder.
};
const initializing: IFetcher = {
	...initial,
	loading: true,
	message: phd.initializing,
};

type funcFetched = (data?: any, error?: any) => any
type funcRefreshing = Function;

// The fetching status of an async fetcher.
export const useFetcher = (notFetching?: boolean): [IFetcher, funcFetched, funcRefreshing] => {
	// Load immediately with following refreshes, by default.
	const [fetcher, setFetcher] = React.useState(notFetching ? initial : initializing);
	// const error = (error: any) => setStatus({...fetcher, loading: false, data: undefined, error});
	const fetched = (data: any, error: any) => setFetcher({loading: false, initializing: false, data, error, message: error ? phd.failed : (data ? phd.succeeded : phd.empty)});
	// First call of refreshing will set the status to initializing.
	const refreshing = () => setFetcher({
		loading: true, data: undefined, error: undefined,
		initializing: !fetcher.loading && fetcher.initializing,
		message: !fetcher.loading && fetcher.initializing ? phd.initializing : phd.refreshing,
	});
	return [fetcher, fetched, refreshing];
};
