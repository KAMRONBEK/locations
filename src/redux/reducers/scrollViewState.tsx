import {SCROLL_TO} from '../types';

export interface appStateProps {}

const initialState = {
    currentIndex: '',
};
export default (state = initialState, {type, payload}: any) => {
    switch (type) {
        case SCROLL_TO: {
            return {
                ...state,
                currentIndex: payload,
            };
        }

        default:
            return state;
    }
};
