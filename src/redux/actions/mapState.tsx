import {
    SET_MY_REGION,
    SET_ORIGINAL_DATA,
    SET_DISPLAY_DATA,
    MAP_REGION_SELECTED,
    MAP_DRAG_STARTED,
    SET_MAP_STATE,
    MARKER_PRESSED,
    MAP_PRESSED,
    SET_DESTINATION_COORDS,
} from '../types';
import {Platform} from 'react-native';

export const setMyRegion = (payload: any) => ({
    type: SET_MY_REGION,
    payload,
});

export const setOriginalData = (payload: any) => ({
    type: SET_ORIGINAL_DATA,
    payload,
});

export const setDisplayData = (payload: any) => ({
    type: SET_DISPLAY_DATA,
    payload,
});

export const regionSelected = (payload: any) => ({
    type: MAP_REGION_SELECTED,
    payload,
});

export const mapDragStarted = () => ({
    type: MAP_DRAG_STARTED,
});

export const setMapState = (payload) => ({
    type: SET_MAP_STATE,
    payload,
});

export const markerPressed = (payload) => ({
    type: MARKER_PRESSED,
    payload,
});

export const mapPressed = (payload) => ({
    type: MAP_PRESSED,
    payload,
});

export const setDestinationCoords = (payload) => ({
    type: SET_DESTINATION_COORDS,
    payload,
});
