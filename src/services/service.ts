import source from '../assets/branches';

interface searchProps {
    searchKey: string;
    list: Array<{}>;
}
class Service {
    static get() {
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
                        'branch' +
                        branch.name +
                        ' ' +
                        branch.address +
                        ' ' +
                        branch.bank
                    } `,
                };
            });

            let minibanks = source.data.minibanks.map((minibank, index) => {
                return {
                    ...minibank,
                    longitude: parseFloat(minibank.location.split(',')[1]),
                    latitude: parseFloat(minibank.location.split(',')[0]),
                    tag: `branch ${
                        minibank.name +
                        ' ' +
                        minibank.address +
                        ' ' +
                        minibank.type
                    } `,
                };
            });

            let atms = source.data.atms.map((atm, index) => {
                return {
                    ...atm,
                    longitude: parseFloat(atm.location.split(',')[1]),
                    latitude: parseFloat(atm.location.split(',')[0]),
                    tag: `branch ${
                        atm.name + ' ' + atm.address + ' ' + atm.type
                    } `,
                };
            });

            setTimeout(() => {
                resolve([...branches, ...minibanks, ...atms]);
            }, 500);
        });
    }

    static search = ({searchKey, list}: searchProps) => {
        return new Promise((resolve, reject) => {
            let resultList = [];
            list.map((marker, index) => {
                if (marker && marker.tag.includes(searchKey))
                    resultList.push(marker);
            });
            if (resultList.length > 0) {
                resolve(resultList);
            } else reject('404');
        });
    };
}

export default Service;
