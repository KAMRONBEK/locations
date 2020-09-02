import {
    SHOW_FLASH_MESSAGE,
    SHOW_MAP_LOADING,
    HIDE_MAP_LOADING,
    TOGGLE_MENU,
    SET_LANGUAGE,
} from '../types';
import {ENG, UZ} from '../../constants';

export interface appStateProps {
    flashMessage: string;
    flashMessageType: string;
    mapLoading: boolean;
}

const initialState = {
    menuOpen: false,
    flashMessage: '',
    flashMessageType: '',
    mapLoading: false,
    language: UZ,
};

export default (state = initialState, {type, payload}: any) => {
    switch (type) {
        case TOGGLE_MENU:
            return {...state, menuOpen: !state.menuOpen};
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
        case SET_LANGUAGE: {
            return {
                ...state,
                language: payload,
                menuOpen: false,
            };
        }
        default:
            return state;
    }
};
