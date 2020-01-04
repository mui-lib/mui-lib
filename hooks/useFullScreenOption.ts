'use strict';

import {useMediaQuery} from '@material-ui/core';
import useTheme from '@material-ui/core/styles/useTheme';

// Used for the responsive full-screen dialog.
// @see https://material-ui.com/components/dialogs/#responsive-full-screen
export const useDialogFullScreenOption = () => {
	const theme = useTheme();
	return useMediaQuery(theme.breakpoints.down('sm'));
};
