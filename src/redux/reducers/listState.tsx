import {SHOW_LIST, HIDE_LIST, TOGGLE_LIST} from '../types';

const initialState = {
    panelVisibility: false,
};
export default (state = initialState, {type, payload}: any) => {
    switch (type) {
        case SHOW_LIST: {
            return {
                ...state,
                panelVisibility: true,
            };
        }
        case HIDE_LIST: {
            return {
                ...state,
                panelVisibility: false,
            };
        }
        case TOGGLE_LIST: {
            return {
                ...state,
                panelVisibility: !state.panelVisibility,
            };
        }
        default:
            return state;
    }
};
