import {SHOW_DRAGGABLE_PANEL, HIDE_DRAGGABLE_PANEL} from '../types';

const initialState = {
    panelVisibility: false,
};
export default (state = initialState, {type, payload}: any) => {
    switch (type) {
        case SHOW_DRAGGABLE_PANEL: {
            return {
                ...state,
                panelVisibility: true,
            };
        }
        case HIDE_DRAGGABLE_PANEL: {
            console.log(payload);
            return {
                ...state,
                panelVisibility: false,
            };
        }
        default:
            return state;
    }
};
