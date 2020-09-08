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
        // console.log(prev.id);
        return curr.distance < prev.distance
            ? 1
            : curr.distance > prev.distance
            ? -1
            : 0;
    });
};

export const findDuplicates = (arr) => {
    let sorted_arr = arr.slice().sort(); // You can define the comparing function here.
    // JS by default uses a crappy string compare.
    // (we use slice to clone the array so the
    // original array won't be modified)
    console.log(sorted_arr);
    console.log(arr.length);
    console.log(sorted_arr.length);

    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1].id == sorted_arr[i].id) {
            results.push(sorted_arr[i]);
        }
    }
    return results;
};
