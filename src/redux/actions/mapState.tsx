import {
    SET_MY_REGION,
    SET_ORIGINAL_DATA,
    SET_DISPLAY_DATA,
    MAP_REGION_SELECTED,
    MAP_DRAG_STARTED,
    MAP_PRESSED,
    SET_ROUTE_DESTINATION,
    SET_MAP_MODE,
    MARKER_SELECTED,
    SET_ZOOM_LEVEL,
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

export const setMapMode = (payload) => ({
    type: SET_MAP_MODE,
    payload,
});

export const markerSelected = (payload) => ({
    type: MARKER_SELECTED,
    payload,
});

export const mapPressed = (payload) => ({
    type: MAP_PRESSED,
    payload,
});

export const setDestinationCoords = (payload) => ({
    type: SET_ROUTE_DESTINATION,
    payload,
});

export const setZoomLevel = (payload) => ({
    type: SET_ZOOM_LEVEL,
    payload,
});
