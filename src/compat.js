
const oldSend = 'sendAsync';
const newSend = 'send';

export const getSendMethodName = () => {
  let methodName;
  if (typeof web3.currentProvider[oldSend] === 'function') {
    methodName = oldSend;
  } else {
    methodName = newSend;
  }
  return methodName;
};
