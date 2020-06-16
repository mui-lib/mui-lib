import React from 'react';
import {loadScript} from 'src/utils/HtmlScriptLoader';

export const useAsyncScript = (
	url: string, isLoaded: () => boolean, callback?: () => any,
): [boolean] => {
	const [loaded, setLoaded] = React.useState(isLoaded);

	React.useLayoutEffect(() => {
		if (isLoaded()) {return;}
		console.warn('Loading the depended script now!', new Date().toLocaleString());
		loadScript(url).then(() => {
			console.log('Loaded the target script:', url, new Date().toLocaleString());
			callback && callback();
			setLoaded(true);
		}).catch((ex) => {
			console.error('Failed to load the target script:', ex, new Date().toLocaleString());
		});
	}, [loaded]);

	return [loaded];
};