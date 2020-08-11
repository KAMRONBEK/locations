import {SET_MY_REGION, SET_ORIGINAL_DATA, SET_DISPLAY_DATA} from '../types';
import {branchType} from '../../screens/map/Map';

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
