import os from 'node:os';
import { parseArg, getArgs } from './args/parse.js';
import { getDirName, checkPath } from './path/path.js';
import { EOL } from 'os';
import { dirname, join, parse, normalize, isAbsolute } from 'path';
import { list } from './fs/list.js'
import { createFile } from './fs/create.js';
import { homedir, getOsInfo } from './os/osInfo.js';
import { stdin, stdout, exit } from 'process';
import readline from 'readline';
const usernName = '--username=';
const greetings = 'Welcome to the File Manager';
const byeMessage = 'Thank you for using File Manager';
const dirMsg = 'You are currently in';

let username = parseArg(usernName);
let dir = os.homedir();

const getMsg = (type, str = dir) => {
  let outMessage = '';

  switch (type) {
    case 'dir':
      outMessage = dirMsg + ' ' + str;
      break;

    case 'greet':
      outMessage = (str) ? greetings + ', ' + str + '!' : greetings + '!';
      break;

    case 'goodbye':
      outMessage = (str) ? byeMessage + ', ' + str + '!' : byeMessage + '!';
      break;

    default:
      outMessage = '';
      break;
  }

  return outMessage;
};

//console.log(getMsg('greet', username));

const displayDirectory = () => {
  console.log(getMsg('dir') + EOL);
};

//displayDirectory();

const getAbsolutePath = (pathStr) => {
  const pathRoot = parse(pathStr).root;
  const path = (pathRoot === '' || pathRoot === '/' || pathRoot === '\\') ?
               join(dir, pathStr) :
               pathStr;
  return path;
};

const command = (func) => {
  try {
    if (func) {
      func();
    }
  } catch (error) {
    console.log(EOL + error.message);
  }

  displayDirectory();
};

const readProcess = () => {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout
  });

  console.log(getMsg('greet', username));
  displayDirectory();

  rl.on('line', (line) => {
    line = line.trim();

    switch (line) {
      case 'up':
        dir = join(dir, '..');
        displayDirectory();
        break;
      case 'ls':
        const ls = () => {
          list(dir);
        };
        command(ls);

      case line.startsWith('add ') ? line : null:
        const add = () => {
          const fileName = getArgs(line, 2, 1);
          const destPath = getAbsolutePath(fileName);
          createFile(destPath);
        };

      case line.startsWith('os ') ? line : null:
        const os = () => {
          const info = getOsInfo(getArgs(line, 2, 1));
          console.log(info);
        };
        command(os);
        break;
      case '.exit':
        rl.close();
        break;
    }
  });

  rl.on('close', () => {
    console.log(getMsg('goodbye', username));
    exit();
  });

  rl.on('error', (error) => {
    console.log(EOL + error.message);
    displayDirectory();
  });

}

readProcess();