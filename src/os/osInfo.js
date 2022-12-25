import { access } from 'fs';
import { homedir, EOL, arch, cpus, userInfo } from 'os';

const getOsInfo = (about) => {
    let info = '';

    switch (about) {
        case '--cpus':
            const cpuInfo = cpus().map((cpu, index) => {
                let str = 'cpu ' + (index + 1) + ': ';
                str += 'model – ' + cpu.model;
                const clockRate = (cpu.speed < 500) ?
                    (cpu.speed / 10).toFixed(1) + 'GHz' :
                    (cpu.speed / 1000).toFixed(1) + 'GHz';
                str += ', clock rate – ' + clockRate;
                return str;
            });
            info = `number of cpus: ${cpus().length}, ${EOL + cpuInfo.join(', ' + EOL)}` ;
            break;
        case '--homedir':
            info = homedir();
            break;
        case '--username':
            info = userInfo().username; // (OS username)
            break;
        case '--architecture':
            // info = arch();
            info = process.arch;
            break;
        default:
            throw new Error();
            break;
    }

    return info;
};

export { homedir, EOL, getOsInfo };