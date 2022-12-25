import { readdir } from 'fs/promises';

export const list = async (dirPath) => {
    let dirArr = [];

    try {
        dirArr = await readdir(dirPath, { withFileTypes: true });
    } catch (error) {
        throw new Error(errorMsg.fail);
    }

    const paths = dirArr.map((dirent) => {
        return dirent.name;
    }).filter((i) => i);

    console.log(paths);
};