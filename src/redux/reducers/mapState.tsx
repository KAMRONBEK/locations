import {
    SET_DEFAULT_REGION,
    SET_MY_REGION,
    SET_ORIGINAL_DATA,
    SET_DISPLAY_DATA,
} from '../types';
import {
    LATITUDE,
    LONGITUDE,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
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
        // case ANIMATE_TO_MARKER: {
        // 	return {...state, CURRENT_MARKER: payload};
        // }
        default:
            return state;
    }
};
