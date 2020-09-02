import Geolocation from '@react-native-community/geolocation';
import {LATITUDE_DELTA, LONGITUDE_DELTA} from '../constants';
import {PermissionsAndroid} from 'react-native';
import {act} from 'react-test-renderer';

// export const getCurrentLocation = (setValue: any) => {
//     Geolocation.getCurrentPosition((info) => {
//         act(() =>
//             setValue({
//                 ...info.coords,
//                 latitudeDelta: LATITUDE_DELTA,
//                 longitudeDelta: LONGITUDE_DELTA,
//             }),
//         );
//     });
// };

export const requestLocationPermission = () => {
    return new Promise(async (resolve, reject) => {
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
                resolve();
                console.log('You can use the location');
            } else {
                reject();
                console.log('location permission denied');
            }
        } catch (err) {
            reject();
            console.warn(err);
        }
    });
};

export const getCurrentPosition = () => {
    if (Geolocation) {
        return new Promise((resolve, reject) =>
            Geolocation.getCurrentPosition(resolve, reject),
        );
    } else {
        return new Promise((resolve) => resolve({}));
    }
};

export const sortArrayAsc = (array) => {
    return array.sort((prev, curr) => {
        return curr.distance < prev.distance
            ? 1
            : curr.distance > prev.distance
            ? -1
            : 0;
    });
};
