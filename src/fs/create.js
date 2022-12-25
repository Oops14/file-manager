import { writeFile } from 'fs/promises';

export const createFile = async (filePath, data = '') => {
    try {
        await writeFile(filePath, data, { flag: 'wx' });
    } catch (error) {
        throw new Error(errorMsg.fail);
    }
};