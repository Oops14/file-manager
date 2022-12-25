
const parseArg = (name) => {
  const args = process.argv.slice(2);

  const username = args.find((element) => {
    return element.startsWith(name);
  });

  return (username) ? username.slice((name).length) : '';
};

const getArgs = (str, argsNum, index) => {
  try {
    const strArr = str.split(' ');

    if (strArr.length !== argsNum) {
      throw new Error(errorMsg.invalid);
    }

    return (index) ? strArr[index] : strArr[1];
  } catch(error) {
    throw new Error(errorMsg.invalid);
  }
};

export { parseArg, getArgs };