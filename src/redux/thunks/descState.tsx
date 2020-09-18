import {Linking} from 'react-native';
import {regionSelected} from '../actions';

export const callPress = () => (dispatch, getState) => {
    Linking.openURL(`tel:${getState().descState.currentRegion?.phone[0]}`);
};

export const locationPress = () => (dispatch, getState) => {
    dispatch(regionSelected(getState().descState.currentRegion));
};
