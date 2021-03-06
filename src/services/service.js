import source from '../assets/branches';
import {getDistance, getPreciseDistance} from 'geolib';
import {getRandomInRange, sortArrayAsc} from './functions';
import {strings} from '../locales/strings';
// import branchType from '../screens/map/Map';

interface branchType {
    id: string;
    name: string;
    address: string;
    location: string;
    mfo: string;
    bank: string;
    phone: string[];
    trial503: string;
    latitude: number;
    longitude: number;
    type: 'atm' | 'branch' | 'minibanks';
    tag: string;
}
interface searchProps {
    searchKey: string;
    list: branchType[];
}

let testData = Array.apply(null, Array(5000)).map(function (x, i) {
    return {
        id: i,
        name: Math.random().toString(36).substring(7),
        address: Math.random().toString(36).substring(7),
        location: {
            latitude: Math.floor(Math.random() * (42 - 40 + 1)) + 40,
            longitude: Math.floor(Math.random() * (70 - 68 + 1)) + 68
        },
        mfo: Math.random(),
        bank: Math.random().toString(36).substring(7),
        phone: Math.random(),
        trial503: Math.random().toString(36).substring(7),
        latitude: getRandomInRange(20, 62, 180, 3),
        longitude: getRandomInRange(28, 100, 180, 3),
        tag: 'test',
        type: 'atm'
    };
});

class Service {
    static get(myLocation) {
        return new Promise((resolve, reject) => {
            console.log(source.data.branches.length, 'ta branch');
            console.log(source.data.atms.length, 'ta atm');
            console.log(source.data.minibanks.length, 'ta minibank');

            let branches = source.data.branches.map((branch, index) => {
                return {
                    ...branch,
                    longitude: parseFloat(branch.location.split(',')[1]),
                    latitude: parseFloat(branch.location.split(',')[0]),
                    type: 'branch',
                    tag: `branch ${
                        'branches' +
                        branch.name +
                        ' ' +
                        branch.address +
                        ' ' +
                        branch.bank +
                        ' ' +
                        '??????????????????' +
                        ' ' +
                        'filial' +
                        ' ' +
                        'filiallar'
                    } `
                };
            });

            let minibanks = source.data.minibanks.map((minibank, index) => {
                return {
                    ...minibank,
                    longitude: parseFloat(minibank.location.split(',')[1]),
                    latitude: parseFloat(minibank.location.split(',')[0]),
                    tag: `minibank ${
                        minibank.name +
                        ' ' +
                        minibank.address +
                        ' ' +
                        minibank.type +
                        ' ' +
                        '????????????????' +
                        ' ' +
                        '??????????????????' +
                        ' ' +
                        'bank' +
                        ' ' +
                        'minibanklar' +
                        ' ' +
                        'minibanks'
                    } `
                };
            });

            let atms = source.data.atms.map((atm, index) => {
                return {
                    ...atm,
                    longitude: parseFloat(atm.location.split(',')[1]),
                    latitude: parseFloat(atm.location.split(',')[0]),
                    tag: `atm ${
                        atm.name +
                        ' ' +
                        atm.address +
                        ' ' +
                        atm.type +
                        ' ' +
                        '????????????????' +
                        ' ' +
                        'shahobcha'
                    } `
                };
            });

            let sorted = sortArrayAsc([...branches, ...minibanks, ...atms]); //sorted by distance

            let identified = sorted.map((item, index) => {
                let distance =
                    myLocation == null
                        ? 0
                        : getPreciseDistance(myLocation, {
                              latitude: parseFloat(item.location.split(',')[0]),
                              longitude: parseFloat(item.location.split(',')[1])
                          }) / 1000;
                let newItem = {...item, id: index, distance: distance};
                return newItem;
            });

            setTimeout(() => {
                resolve(identified);
                // resolve(testData);
            }, 0);
        });
    }

    static search = ({searchKey, list}: searchProps) => {
        return new Promise((resolve, reject) => {
            let resultList: branchType[] = [];
            let key = searchKey.toLowerCase().replace(/ /gi, '|');

            console.log('^(' + key + ')');

            // let searchRegex=
            list.map((marker, index) => {
                if (
                    marker &&
                    marker.tag
                        .toLowerCase()
                        .match(new RegExp('^.*(' + key + ').*$', 'g'))
                ) {
                    resultList.push(marker);
                }
            });
            if (resultList.length > 0) {
                setTimeout(() => {
                    resolve(resultList);
                }, 300);
            } else
                setTimeout(() => {
                    reject('404');
                }, 1000);
        });
    };
}

export default Service;
