import {
    SET_DEFAULT_REGION,
    SET_MY_REGION,
    SET_ORIGINAL_DATA,
    SET_DISPLAY_DATA,
    MAP_REGION_SELECTED,
    MAP_DRAG_STARTED,
    MARKER_PRESSED,
    MAP_PRESSED,
    SET_DIRECTION,
    SET_DIRECTION_LOADING,
    SET_DESTINATION_COORDS,
} from '../types';
import {
    LATITUDE,
    LONGITUDE,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    INITIAL,
    FREE_MAP,
    MAP_WITH_SEARCH,
} from '../../constants';

export interface appStateProps {
    flashMessage: string;
    flashMessageType: string;
    mapLoading: boolean;
}

const initialState = {
    defaultRegion: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    },
    myRegion: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    },
    originalDataList: [],
    displayDataList: [],
    focusRegion: null,
    pressedMarkerId: 0,
    mapMode: FREE_MAP, //FREE_MAP,MAP_WITH_SEARCH,MAP_WITH_CARD_INFO
    dirCoordinates: [],
    endLocation: null,
    loadingDirections: false,
};
export default (state = initialState, {type, payload}: any) => {
    switch (type) {
        case SET_DEFAULT_REGION: {
            return {
                ...state,
                defaultRegion: {...state.defaultRegion, payload},
            };
        }
        case SET_MY_REGION: {
            return {...state, myRegion: payload};
        }
        case SET_ORIGINAL_DATA: {
            return {...state, originalDataList: payload};
        }
        case SET_DISPLAY_DATA: {
            return {...state, displayDataList: payload};
        }
        case MAP_REGION_SELECTED: {
            return {...state, focusRegion: payload};
        }
        case MAP_DRAG_STARTED: {
            return {...state, focusRegion: null};
        }
        case MARKER_PRESSED: {
            let markerID = parseFloat(
                payload._targetInst.return.key.split('$')[1],
            );
            // focusRegion:
            // state.originalDataList[
            // 	payload._targetInst.return.key.split('$')[1]
            // ],

            return {
                ...state,
                pressedMarkerId: markerID,
            };
        }
        case MAP_PRESSED: {
            return {...state, mapMode: payload};
        }
        case SET_DESTINATION_COORDS: {
            return {
                ...state,
                endLocation: payload,
            };
        }
        case SET_DIRECTION_LOADING: {
            return {...state, loadingDirections: payload};
        }
        default:
            return state;
    }
};
