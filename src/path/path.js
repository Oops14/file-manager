import { fileURLToPath } from 'url';

// url should be import.meta.url
const getDirName = (url) => {
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);
  return __dirname;
};

const checkPath = (path) => {
  try {
    stat(path);
    return true;
  } catch (error) {
    throw new Error(errorMsg.fail);
  }
};

export { getDirName, checkPath };