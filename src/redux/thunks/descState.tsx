import {Linking} from 'react-native';
import {regionSelected} from '../actions';

export const callPress = () => (dispatch: any, getState: any) => {
    Linking.openURL(`tel:${getState().descState.currentRegion?.phone[0]}`);
};

export const locationPress = () => (dispatch: any, getState: any) => {
    dispatch(regionSelected(getState().descState.currentRegion));
};
