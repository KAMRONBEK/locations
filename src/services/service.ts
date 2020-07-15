import source from '../assets/branches';

class Service {
    static get() {
        return new Promise((resolve, reject) => {
            let branches = source.data.branches.map((branch, index) => {
                return {
                    ...branch,
                    longitude: parseFloat(branch.location.split(',')[1]),
                    latitude: parseFloat(branch.location.split(',')[0]),
                };
            });

            let minibanks = source.data.minibanks.map((minibank, index) => {
                return {
                    ...minibank,
                    longitude: parseFloat(minibank.location.split(',')[0]),
                    latitude: parseFloat(minibank.location.split(',')[1]),
                };
            });

            let atms = source.data.atms.map((atm, index) => {
                return {
                    ...atm,
                    longitude: parseFloat(atm.location.split(',')[0]),
                    latitude: parseFloat(atm.location.split(',')[1]),
                };
            });

            setTimeout(() => {
                resolve({branches, minibanks, atms});
            }, 500);
        });
    }
}

export default Service;
