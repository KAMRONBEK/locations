import Geolocation from '@react-native-community/geolocation';
import {LATITUDE_DELTA, LONGITUDE_DELTA} from '../constants';

export const getCurrentLocation = (setValue) => {
    Geolocation.getCurrentPosition((info) => {
        setValue({
            ...info.coords,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        });
    });
};
