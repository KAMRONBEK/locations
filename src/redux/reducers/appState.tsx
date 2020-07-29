import {SHOW_FLASH_MESSAGE, SHOW_MAP_LOADING, HIDE_MAP_LOADING} from '../types';

const initialState = {
    flashMessage: '',
    flashMessageType: '',
    mapLoading: false,
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case SHOW_FLASH_MESSAGE:
            return {
                ...state,
                flashMessage: payload.message,
                flashMessageType: payload.type,
            };
        case SHOW_MAP_LOADING:
            return {
                ...state,
                mapLoading: true,
            };
        case HIDE_MAP_LOADING:
            return {
                ...state,
                mapLoading: false,
            };
        default:
            return state;
    }
};
