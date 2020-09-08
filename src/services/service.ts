import source from '../assets/branches';
import {getDistance, getPreciseDistance} from 'geolib';
import {sortArrayAsc} from './functions';
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
                        'Отделений' +
                        ' ' +
                        'filial' +
                        ' ' +
                        'filiallar'
                    } `,
                    distance:
                        getPreciseDistance(myLocation, {
                            latitude: parseFloat(branch.location.split(',')[0]),
                            longitude: parseFloat(
                                branch.location.split(',')[1],
                            ),
                        }) / 1000,
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
                        'Минибанк' +
                        ' ' +
                        'Минибанки' +
                        ' ' +
                        'bank' +
                        ' ' +
                        'minibanklar' +
                        ' ' +
                        'minibanks'
                    } `,
                    distance:
                        getPreciseDistance(myLocation, {
                            latitude: parseFloat(
                                minibank.location.split(',')[0],
                            ),
                            longitude: parseFloat(
                                minibank.location.split(',')[1],
                            ),
                        }) / 1000,
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
                        'Банкомат' +
                        ' ' +
                        'shahobcha'
                    } `,
                    distance:
                        getPreciseDistance(myLocation, {
                            latitude: parseFloat(atm.location.split(',')[0]),
                            longitude: parseFloat(atm.location.split(',')[1]),
                        }) / 1000,
                };
            });

            let sorted = sortArrayAsc([...branches, ...minibanks, ...atms]); //sorted by distance

            let identified = sorted.map((item, index) => {
                let newItem = {...item, id: index};
                return newItem;
            });

            setTimeout(() => {
                resolve(identified);
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
