'use strict';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		bodyBox: {maxWidth: 960, margin: '0 auto'},
		sectionTitle: {margin: 4},
		sectionBox: {margin: theme.spacing(1.5), background: '#f9f9f9', padding: '8px 12px', borderRadius: '5px'},
	}),
);
