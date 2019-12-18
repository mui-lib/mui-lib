//

import IconViewGallery from '@material-ui/icons/Collections';
import IconViewTable from '@material-ui/icons/GridOnRounded';
import IconViewCards from '@material-ui/icons/ViewAgendaRounded';
import IconViewList from '@material-ui/icons/ViewListRounded';
import {defineNewIcon, IGroupedIconButton} from './GroupedIconButtons';

const modes = {
	List: 1, // Simple List `Mobile`
	Cards: 2, // Rich List
	Gallery: 3, // Cards in Multiple Columns
	Table: 4, // Regular Table `Desktop`
};
export const EnumViewModes = modes;

const newIcon = defineNewIcon;
// The builtin view modes available to use, or provide a customized ones.
const iconList = newIcon(modes.List, IconViewList);
const iconCards = newIcon(modes.Cards, IconViewCards);
const iconGallery = newIcon(modes.Gallery, IconViewGallery);
const iconTable = newIcon(modes.Table, IconViewTable);

// View modes, for mobiles, that probably are #Simple-List, #Rich-List, and #Gallery,
export const ViewModeIconsDefaultMobile: IGroupedIconButton[] = [
	iconList, iconCards, iconGallery,
];
// while for desktop, that may be #Table, #Rich-List, and #Gallery.
export const ViewModeIconsDefaultDesktop: IGroupedIconButton[] = [
	iconCards, iconGallery, iconTable,
];
