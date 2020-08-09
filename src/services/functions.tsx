import Geolocation from '@react-native-community/geolocation';
import {LATITUDE_DELTA, LONGITUDE_DELTA} from '../constants';
import {PermissionsAndroid} from 'react-native';
import {act} from 'react-test-renderer';

export const getCurrentLocation = (setValue: any) => {
    Geolocation.getCurrentPosition((info) => {
        act(() =>
            setValue({
                ...info.coords,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }),
        );
    });
};

export const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Example App',
                message: 'Example App access to your location ',
                buttonPositive: 'Yes',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
        } else {
            console.log('location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};
