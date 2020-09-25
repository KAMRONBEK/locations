import {HIDE_CALLOUT, SHOW_CALLOUT} from '../types';

const initialState = {
    currentRegion: null,
    calloutVisibility: false, //false
};

export default (state = initialState, {type, payload}: any) => {
    switch (type) {
        case SHOW_CALLOUT:
            console.log('show this', payload, 'region');
            return {
                ...state,
                calloutVisibility: true,
                currentRegion: payload,
            };
        case HIDE_CALLOUT:
            return {
                ...state,
                calloutVisibility: false,
                currentRegion: null,
            };
        default:
            return state;
    }
};
