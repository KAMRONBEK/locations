import {Dimensions} from 'react-native';

export const DIRECTION_API_KEY = 'AIzaSyAg85fttaNZA_wmaZgvpFfzrUs8ohWrVBc';

export const LATITUDE = 41.2995;
export const LONGITUDE = 69.2401;
export const LONGITUDE_DELTA = 0.01222;
export const LATITUDE_DELTA = 0.00721;

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

export const CARD_HEIGHT = 150;
export const CARD_WIDTH = deviceWidth - 80;
export const SPACING_FOR_CARD_INSET = 30;

//searchStatus
export const INITIAL = 'initial';
export const SEARCHING = 'searching';
export const DONE_SEARCHING = 'done_searching';

//mapState
export const FREE_MAP = 'free_map';
export const MAP_WITH_CARD_INFO = 'map_with_card_info';
export const MAP_WITH_SEARCH = 'map_with_search';
export const MAP_WITH_DESC = 'map_with_desc';

//descPanle
export const DESC_HEIGHT = 400;
export const DESC_WIDTH = deviceWidth;

export const BORDER_RADIUS = 12;
