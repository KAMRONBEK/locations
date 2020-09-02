import {SHOW_DESCRIPTION, HIDE_DESCRIPTION} from '../types';

const initialState = {
    currentRegion: null,
    descVisibility: false, //false
};

export default (state = initialState, {type, payload}: any) => {
    switch (type) {
        case SHOW_DESCRIPTION:
            return {
                ...state,
                descVisibility: true,
                currentRegion: payload,
            };
        case HIDE_DESCRIPTION:
            return {
                ...state,
                descVisibility: false,
                currentRegion: null,
            };
        default:
            return state;
    }
};
