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
                    tag: `minibank ${
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
                    tag: `atm ${
                        atm.name + ' ' + atm.address + ' ' + atm.type
                    } `,
                };
            });

            setTimeout(() => {
                resolve([...branches, ...minibanks, ...atms]);
            }, 200);
        });
    }

    static search = ({searchKey, list}: searchProps) => {
        return new Promise((resolve, reject) => {
            let resultList = [];
            let key = searchKey.toLowerCase().replace(/ /gi, '|');
            console.log('^(' + key + ')');

            // let searchRegex=
            list.map((marker, index) => {
                if (
                    marker &&
                    marker.tag
                        .toLowerCase()
                        .match(new RegExp('^.*(' + key + ').*$', 'g'))
                )
                    resultList.push(marker);
                console.log(marker);
            });
            if (resultList.length > 0) {
                setTimeout(() => {
                    resolve(resultList);
                }, 200);
            } else
                setTimeout(() => {
                    reject('404');
                }, 1000);
        });
    };
}

export default Service;
